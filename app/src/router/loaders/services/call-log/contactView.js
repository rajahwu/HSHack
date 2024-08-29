import { redirect } from "react-router-dom";
import { auth } from '../../../../services/firebase';
import { SalesContact } from '../../../../models/SalesContact';
import Customer from '../../../../models/Customer';
import Correspondence from '../../../../models/Correspondence'; // Make sure to import Correspondence if used

export async function loader({ params }) {
  const user = auth.currentUser;

  if (!user) {
    return redirect('/login');
  }

  const { username, contactId } = params;

  if (username !== user.displayName) {
    return redirect('/services/call-log/leads');
  }

  try {
    const salesContact = await SalesContact.findById(contactId);
    if (!salesContact) {
      throw new Error('Sales contact not found');
    }
    await salesContact.updateStatus(`${salesContact.type}ing`);

    const customer = await Customer.findById(salesContact.participants.customer);
    if (!customer) {
      throw new Error('Customer not found');
    }

    salesContact.participants.customer = customer;
    salesContact.participants.caller = { username: user.displayName, id: user.uid };
    await salesContact.updateStatus("corresponding");

    let correspondence;
    try {
      correspondence = await Correspondence.getCorrespondence(salesContact.correspondenceId);
    } catch (error) {
      console.warn("Failed to get correspondence, using fallback:", error.message);
      correspondence = await Correspondence.createFromSalesContact(salesContact); // Generate fallback
    }

    // salesContact.correspondence = correspondence;
    await salesContact.updateStatus("Ending");
     // Wait before creating the correspondence
    await new Promise((resolve) => setTimeout(resolve, 300));
    await salesContact.updateStatus("complete");


    return { salesContact };

  } catch (error) {
    console.error('Failed to find sales contact:', error.message);
    return redirect('/error');
  }
}

import { redirect } from "react-router-dom";
import { auth } from '../../../../services/firebase';
import { SalesContact } from '../../../../models/SalesContact';
import Customer  from '../../../../models/Customer';

export async function loader({ params }) {
  const user = auth.currentUser;

  if (!user) {
    // Redirect if no user is authenticated
    return redirect('/login');
  }

  const { username, callId } = params;

  if (username !== user.displayName) {
    return redirect('/services/call-log/leads');
  }

  try {
    const salesContact = await SalesContact.findById(callId);

    if (!salesContact) {
      throw new Error('Sales contact not found');
    }

    const customer = await Customer.findById(salesContact.participants.customer);

    if (!customer) {
      throw new Error('Customer not found');
    }

    // Add the customer and caller objects directly to salesContact
    salesContact.customer = customer;
    salesContact.caller = { username: user.displayName, id: user.uid };

    console.log(salesContact);

    return { salesContact }; // Return the sales contact data

  } catch (error) {
    console.error('Failed to find sales contact:', error.message);
    return redirect('/error'); // Redirect to an error page or a fallback route
  }
}

import { SalesContact } from "../../../../models/SalesContact";
import Customer  from "../../../../models/Customer";
import Correspondence from "../../../../models/Correspondence";
import {  auth } from "../../../../services/firebase";

export async function loader({ params }) {
    const user = auth.currentUser;

  if (!user) {
    return redirect('/login');
  }
    
    const { contactId } = params;
    if (!contactId) {
        throw new Error("Contact ID is missing in the route parameters.");
    }
    try {
        const salesContact = await SalesContact.findById(contactId);
        salesContact.participants.caller = { avatar: user.photoURL, username: user.displayName, id: user.uid };
        salesContact.participants.customer = await Customer.findById(salesContact.participants.customer);
        console.log(salesContact);
        if (!salesContact) {
            throw new Error(`Sales contact with ID ${contactId} not found.`);
        }
        const correspondence = await Correspondence.getCorrespondence(salesContact.correspondenceId);
        return { salesContact, correspondence };
    } catch (error) {
        console.error("Error loading sales contact or correspondence:", error);
        throw new Error("Failed to load sales contact or correspondence. Please try again.");
    }
}

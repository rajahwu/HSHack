import { SalesContact } from "../../../../models/SalesContact";
import Correspondence from "../../../../models/Correspondence";

export async function loader({ params }) {
    const { contactId } = params;
    console.log("in summary loader ...")
    if (!contactId) {
        throw new Error("Contact ID is missing in the route parameters.");
    }

    try {
        const salesContact = await SalesContact.findById(contactId);
        if (!salesContact) {
            throw new Error(`Sales contact with ID ${contactId} not found.`);
        }
        const correspondence = await Correspondence.getCorrespondence(salesContact.correspondenceId);
        console.log("summary loader call: ", correspondence)
        return { salesContact, correspondence };
    } catch (error) {
        console.error("Error loading sales contact or correspondence:", error);
        throw new Error("Failed to load sales contact or correspondence. Please try again.");
    }
}

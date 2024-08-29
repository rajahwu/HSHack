import { redirect } from "react-router-dom";
import { SalesContact } from "../../../../models/SalesContact";
import { Correspondence } from "../../../../models/Correspondence";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const phoneNumber = formData.get("phoneNumber");
    const email = formData.get("email");
    const textNumber = formData.get("textNumber");

    const leadData = {
      userId: formData.get("userId"),
      leadId: formData.get("leadId"),
      phoneNumber,
      email,
      textNumber,
    };

    // Determine the type of communication
    const type = phoneNumber ? "call" : email ? "email" : textNumber ? "text" : "unknown";

    // Create a new SalesContact
    const salesContact = await SalesContact.create({
      date: new Date(),
      type,
      duration: 0,
      participants: {
        caller: leadData.userId,
        customer: leadData.leadId,
      },
      status: "pending",
      correspondenceId: null,
      phoneNumber,
      email,
      textNumber,
    });

    // Create correspondence based on the sales contact
    const correspondence = await Correspondence.createFromSalesContact(salesContact);
    console.log("Correspondence created");

    // Link correspondence to sales contact
    await salesContact.linkCorrespondence(correspondence.id);
    console.log("Linked Correspondence", { salesContact, correspondence });

    // Construct the redirect link
    const contactViewLink = `${salesContact.type}/${salesContact.id}`;

    // Redirect to the contact view page
    return redirect(contactViewLink);

  } catch (error) {
    console.error("Error in contact lead action:", error);
    // Optionally redirect to an error page or show a notification
    return redirect("/error"); 
  }
};

import { redirect } from "react-router-dom";
import { SalesContact } from "../../../../models/SalesContact";

export const action = async ({ request }) => {
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

  const type = phoneNumber ? "call" : email ? "email" : textNumber ? "text" : "unknown";
  // Perform any necessary logic with leadData here
  // You could save the data, initiate a call, send an email, etc.
  const salesContact = await SalesContact.create({
    date: new Date(),
    type: type,
    duration: 0,
    participants: {
      caller: leadData.userId,
      customer: leadData.leadId
    },
    phoneNumber: leadData.phoneNumber,
    email: leadData.email,
    textNumber: leadData.textNumber,
  });

  const contactViewLink = `${salesContact.type}/${salesContact.id}`;

  // Redirect to CallView with the lead data as state or URL parameters
  return redirect(contactViewLink); // Make sure the path matches your routing setup
};

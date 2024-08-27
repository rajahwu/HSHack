import { redirect } from "react-router-dom";
import { SalesContact } from "../../../../models/SalesContact";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const leadData = {
    userId: formData.get("userId"),
    leadId: formData.get("leadId"),
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    textNumber: formData.get("textNumber"),
  };

  const type = phoneNumber ? "call" : email ? "email" : "text";

  // Perform any necessary logic with leadData here
  // You could save the data, initiate a call, send an email, etc.
  const salesContact = SalesContact.create({
    date: new Date(),
    type: type,
    duration: 0,
    participants: {
      caller: leadData.userId,
      customer: leadData.leadId
    },
  });


  // Redirect to CallView with the lead data as state or URL parameters
  return redirect(`${leadData.leadId}`);
};

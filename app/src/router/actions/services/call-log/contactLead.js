import { redirect } from "react-router-dom";

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

  console.log(leadData);

  // Perform any necessary logic with leadData here
  // You could save the data, initiate a call, send an email, etc.

  // Redirect to CallView with the lead data as state or URL parameters
  return redirect(`${leadData.leadId}`, {
    state: leadData,
  });
};

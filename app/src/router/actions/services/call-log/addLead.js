// src/router/actions/services/call-log/addLead.js
import { redirect } from "react-router-dom";
import { Customer } from "../../../../models/Customer";

export async function action({ request, params }) {
  const formData = await request.formData();
  const leadCount = parseInt(formData.get("leadCount"), 10);
  const { username } = params;

  for (let i = 0; i < leadCount; i++) {
    await Customer.autoCreate();
  }

  // Assuming 'user' is accessible via context or other means
  return redirect(`/${username}/call-log/leads`);
}

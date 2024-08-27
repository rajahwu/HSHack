// src/router/actions/services/call-log/addLead.js
import { redirect } from "react-router-dom";
import { Customer } from "../../../../models/Customer";
import { auth } from '../../../../services/firebase';

export async function action({ request, params }) {
  const user = auth.currentUser;
  const { username } = params;

  if (user.displayName !== username) {
    return redirect("/login");
  }

  const formData = await request.formData();
  const leadCount = parseInt(formData.get("leadCount"), 10);

  for (let i = 0; i < leadCount; i++) {
    await Customer.autoCreate({ assignedTo: user.uid });
  }

  // Assuming 'user' is accessible via context or other means
  return redirect(`/${username}/call-log/leads`);
}

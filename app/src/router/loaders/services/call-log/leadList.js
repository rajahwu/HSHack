import { redirect } from "react-router-dom";
import Customer from "../../../../models/Customer";
import { auth } from '../../../../services/firebase';

export async function loader({ params }) {
  const user = auth.currentUser;

  if (!user) {
    // Redirect if no user is authenticated
    return redirect('/login'); // or any route you use for unauthenticated users
  }

  const { username } = params;

  if (username !== user.displayName) {
    return redirect('/services/call-log/leads');
  }

  try {
    const customers = await Customer.getCustomersAssignedTo(user.uid);
    return customers;
  } catch (error) {
    console.error('Error loading customers:', error);
    // Redirect or handle error appropriately
    return redirect('/error'); // or any route you use for errors
  }
}

import { SalesContact } from '../../../models/SalesContact';
import { redirect } from 'react-router-dom';
import Customer from '../../../models/Customer';
import { auth } from '../../../services/firebase';

export async function loader({ params }) {
  const user = auth.currentUser;
  const { username } = params;

  if (!user) {
    return redirect('/login');
  }

  if (username !== user.displayName) {
    return redirect('/services/call-log/leads');
  }

  try {
    const leads = await Customer.getCustomersAssignedTo(user.uid);
    const contactHistory = await SalesContact.findByCaller(user.uid);

    const scores = contactHistory.map(() => Math.floor(Math.random() * 101)); // Random scores between 0 and 100
    const outcomes = contactHistory.map(() => Math.random() > 0.5 ? 1 : 0); // Random outcomes, 1 or 0

    return { leads, contactHistory, scores, outcomes }; 

  } catch (error) {
    console.error('Error loading data:', error.message);
    return redirect('/error');
  }
}

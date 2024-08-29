import { SalesContact } from '../../../../models/SalesContact';
import { auth } from '../../../../services/firebase';
import { redirect } from 'react-router-dom';


export async function loader({ params }) {
  const user = auth.currentUser;

  if (!user) {
    // Redirect if no user is authenticated
    return redirect('/login');
  }

  const { username } = params;

  if (username !== user.displayName) {
    return redirect('/services/call-log/history');
  }
  try {
      const contactHistory = await SalesContact.findByCaller(user.uid);

      return { contactHistory };
  } catch (error) {
    console.error('Failed to find contact history:', error.message);
    return redirect('/error'); // Redirect to an error page or a fallback route
  }
    
    
}
import { redirect } from "react-router-dom";
import { Customer } from "../../../../models/Customer";
import { auth } from '../../../../services/firebase';

export async function loader({ params }) {
    const user = auth.currentUser;
    const { username } = params;

    if (username !== user.displayName) {
        redirect('/services/call-log/leads');
    }
    const customers = await Customer.getCustomersAssignedTo(user.uid);
    return customers;
}
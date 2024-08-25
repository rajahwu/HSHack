// src/router/actions/auth/login.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "react-router-dom";
import { User } from "../../../models/User";
import { auth } from "../../../services/firebase";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Optionally, you can fetch the Firestore user data here
    const userData = await User.getById(user.uid);

    return redirect(`/${userData.displayName}/dashboard`);
  } catch (error) {
    console.error("Error signing in:", error.code, error.message);
    return redirect("/");
  }
}
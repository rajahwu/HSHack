// src/router/actions/auth/signout.js
import { signOut } from "firebase/auth";
import { redirect } from "react-router-dom";
import { auth } from "../../../services/firebase";

export async function action() {
  try {
    await signOut(auth);
    return redirect("/");
  } catch (error) {
    console.error("Error signing out:", error.code, error.message);
    return redirect("/");
  }
}
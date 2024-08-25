// src/router/actions/auth/register.js
import { redirect } from "react-router-dom";
import { User } from "../../../models/User";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const newUser = await User.create(email, password);
    return redirect(`/${newUser.displayName}/dashboard`);
  } catch (error) {
    console.error("Error registering user:", error.code, error.message);
    return redirect("/");
  }
}
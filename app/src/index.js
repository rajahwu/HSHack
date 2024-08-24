// import { getAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/root/Home";
import { AuthProvider } from "./context/AuthContext";
import './services/firebase';

// const Home = () => {
//     return (
//         <div id="container">
//             <h1>Home</h1>
//         </div>
//     )
// };
const Login = () => { return (<div>Login</div>) };
const Register = () => { return (<div>Register</div>) };
const SignOut = () => { return (<div>SignOut</div>) };
const Dashboard = () => { return (<div>Dashboard</div>) };
const Profile = () => { return (<div>Profile</div>) };
const Settings = () => { return (<div>Settings</div>) };

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const auth = getAuth();
const user = auth.currentUser;

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            {
                path: ":username", children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                        // loader: async ({ params }) => {
                        //     const username = params.username;
                        //     return dashboardLoader({ username });
                        // },
                    },
                    { path: "settings", element: <Settings /> },
                    { path: "profile", element: <Profile /> },
                    { path: "signout", element: <SignOut /> },
                ]
            },

        ]
    }
]);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
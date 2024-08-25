import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Login, Register, SignOut } from "./components/auth";
import { Dashboard, Home, Profile, Settings } from "./components/root";
import CallLog from './components/services/CallLog';
import { AuthProvider } from "./context/AuthContext";
import { loginAction, registerAction, signOutAction } from "./router/actions/auth";
import './services/assembly_ai';
import './services/firebase';
import './services/gemini';

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "register", element: <Register />, action: registerAction },
            { path: "login", element: <Login />, action: loginAction },
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
                    { path: "call-log", element: <CallLog /> },
                    { path: "settings", element: <Settings /> },
                    { path: "profile", element: <Profile /> },
                    { path: "signout", element: <SignOut />, action: signOutAction },
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
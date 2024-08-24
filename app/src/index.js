import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Login, Register, SignOut } from "./components/auth";
import { Dashboard, Home, Profile, Settings } from "./components/root";
import { AuthProvider } from "./context/AuthContext";
import './services/firebase';

const domNode = document.getElementById("root");
const root = createRoot(domNode);

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
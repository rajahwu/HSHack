import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Login, Register, SignOut } from "./components/auth";
import { Dashboard, Home, Profile, Settings } from "./components/root";
import CallLog, { AddLead, ContactHistory, ContactView, LeadsList } from "./components/services/LeadContactLog"
import { AuthProvider } from "./context/AuthContext";
import { loginAction, registerAction, signOutAction } from "./router/actions/auth";

import { action as addLeadAction } from "./router/actions/services/call-log/addLead";
import { action as contactLeadAction } from "./router/actions/services/call-log/contactLead";
import { loader as callViewLoader } from "./router/loaders/services/call-log/contactView";
import { loader as leadListLoader } from "./router/loaders/services/call-log/leadList";

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
                    { path: "leads/new", element: <AddLead />, action: addLeadAction },
                    {
                        path: "call-log", element: <CallLog />,
                        children: [
                            { index: true, path: "new-contact", element: <ContactView /> },
                            {
                                path: "leads",
                                element: <LeadsList />,
                                loader: leadListLoader,
                                action: contactLeadAction,
                                children: [
                                    { path: "add", element: <AddLead /> },
                                    { path: "call/:contactId", element: <ContactView />, loader: callViewLoader },
                                    { path: "email/:contactId", element: <ContactView />, loader: callViewLoader },
                                    { path: "text/:contactId", element: <ContactView />, loader: callViewLoader }
                                ]
                            },
                            {
                                path: "history", element: <ContactHistory />, children: [
                                    { path: ":callId", element: <ContactView /> }
                                ]
                            },
                        ]
                    },
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
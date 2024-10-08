import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Login, Register, SignOut } from "./components/auth";
import { Home, Profile, Settings, Error } from "./components/root";
import Chat from "./components/services/Chat";
import Dashboard, { DashboardContent } from "./components/root/Dashboard";
import CallLog, { CallLogLanding, AddLead, ContactHistory, ContactView, ContactSummary, LeadsList } from "./components/services/LeadContactLog"
import { AuthProvider } from "./context/AuthContext";
import { loginAction, registerAction, signOutAction } from "./router/actions/auth";

import { action as addLeadAction } from "./router/actions/services/call-log/addLead";
import { action as contactLeadAction } from "./router/actions/services/call-log/contactLead";
import { loader as dashboardLoader } from "./router/loaders/dashboard";
import { loader as leadListLoader } from "./router/loaders/services/call-log/leadList";
import { loader as contactViewLoader } from "./router/loaders/services/call-log/contactView";
import { loader as contactHistoryLoader  } from "./router/loaders/services/call-log/contactHistory";
import { loader as contactSummaryLoader } from "./router/loaders/services/call-log/contactSummary";

import './services/firebase';
import './services/assembly_ai';
import './services/gemini';

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: "register", element: <Register />, action: registerAction },
            { path: "login", element: <Login />, action: loginAction },
            { path: "/error", element: <Error /> },
            {
                path: ":username", children: [
                    { path: "upgrade", element: <div>Upgrade to Pro</div> },
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                        loader: dashboardLoader, 
                        children: [
                            { index: true, element: <DashboardContent />, loader: dashboardLoader },
                            { path: "settings", element: <Settings /> },
                            { path: "profile", element: <Profile /> },
                        ],
                    },
                    { path: "chat", element: <Chat /> },
                    { path: "leads/new", element: <AddLead />, action: addLeadAction },
                    {
                        path: "call-log", element: <CallLog />,
                        children: [
                            { index: true, element: <CallLogLanding /> },
                            { 
                                path: ":contentType/:contactId/review",
                                element: <ContactSummary />, 
                                loader: contactSummaryLoader 
                            },
                                {
                                path: "leads",
                                element: <LeadsList />,
                                loader: leadListLoader,
                                action: contactLeadAction,
                                children: [
                                    { path: "add", element: <AddLead />, addLeadAction },
                                    { path: ":contentType/:contactId", element: <ContactView />, loader: contactViewLoader },
                                ]
                            },
                            {
                                path: "history", 
                                element: <ContactHistory />, 
                                loader: contactHistoryLoader, 
                                children: [
                                    { path: ":callId", element: <ContactView /> }
                                ]
                            },
                        ]
                    },
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
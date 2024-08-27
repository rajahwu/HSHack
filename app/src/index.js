import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Login, Register, SignOut } from "./components/auth";
import { Dashboard, Home, Profile, Settings } from "./components/root";
import CallLog from './components/services/CallLog';
import AddLead from "./components/services/CallLog/AddLead";
import CallView from './components/services/CallLog/CallView';
import CallsMadeList from "./components/services/CallLog/CallsMadeList";
import LeadsList from "./components/services/CallLog/LeadsList";
import { AuthProvider } from "./context/AuthContext";
import { loginAction, registerAction, signOutAction } from "./router/actions/auth";
import { action as addLeadAction } from "./router/actions/services/call-log/addLead";
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
                    { path: "call-log", element: <CallLog />,
                        children: [
                            { index: true, path: "new-call", element: <CallView /> },
                            { path: "history", element: <CallsMadeList />, children: [
                                { path: ":callId", element: <CallView />}
                            ]},
                            { path: "leads", element: <LeadsList />, children: [
                                { path: "add", element: <AddLead /> },
                                { path: ":callId", element: <CallView />}
                            ]},
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
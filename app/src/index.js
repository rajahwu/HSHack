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
            { path: "register", element: <Register />, action: RegisterAction },
            { path: "login", element: <Login />, action: LoginAction },
            {
                path: ":username", children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                        loader: async ({ params }) => {
                            const username = params.username;
                            return dashboardLoader({ username });
                        },
                    },
                    { path: "bookings", element: <Booking />, action: bookingsAction },
                    { path: "custom-orders", element: <CustomOrder /> },
                    { path: "settings", element: <Settings /> },
                    { path: "profile", element: <Profile /> },
                    { path: "chat", element: <Chat />, loader: chatLoader, action: sendMessageAction },
                    { path: "chat/:sessionId", element: <ChatSession />, loader: chatSessionLoader, action: sendMessageAction },
                    { path: "signout", element: <SignOut />, action: SignOutAction },
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
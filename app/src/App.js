import React from "react";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <>
            <h1>App</h1>
            <div>
                <Outlet />
            </div>
        </>
    )

}
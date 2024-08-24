import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layouts/Header";

export default function App() {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
        </>
    )

}
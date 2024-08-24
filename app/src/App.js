import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

export default function App() {
    const location = useLocation();
    return (
        <>
            <Header location={location} />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    )

}
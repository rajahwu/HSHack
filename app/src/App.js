import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

export default function App() {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    )

}
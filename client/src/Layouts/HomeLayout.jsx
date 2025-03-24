import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const HomeLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="layout-home">{children}</main>
            <Footer />
        </div>
    );
};

import React from "react";
import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const HomeLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="layout-home">{children}</main>
            <Footer />
        </div>
    );
};

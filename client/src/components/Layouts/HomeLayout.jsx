import React from "react";
import Header from "../Header/Header";

export const HomeLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="layout-home">{children}</main>
        </div>
    );
};

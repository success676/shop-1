import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import Header from "../Header/Header";

export const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="layout-position">
                <Sidebar />
                <main className="layout-main">{children}</main>
            </div>
        </div>
    );
};

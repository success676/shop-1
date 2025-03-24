import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

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

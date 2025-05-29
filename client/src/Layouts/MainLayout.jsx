import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

export const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <div className="layout-container">
                <Sidebar />
                <main className="main-content">{children}</main>
            </div>
        </div>
    );
};
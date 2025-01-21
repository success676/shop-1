import React from "react";
import AdminNav from "../AdminNav";
import Header from "../Header/Header";

export const AdminLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="layout-position-admin">
                <AdminNav />
                <main className="layout-admin">{children}</main>
            </div>
        </div>
    );
};

import React from "react";

import AdminNav from "../components/Admin/AdminNav/AdminNav";
import Header from "../components/Header/Header";

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

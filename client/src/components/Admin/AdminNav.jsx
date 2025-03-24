import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
    const location = useLocation();

    const links = [
        { path: "/admin/dashboard", label: "Аналитика" },
        { path: "/admin/users", label: "Пользователи" },
        { path: "/admin/products", label: "Продукты" },
        { path: "/admin/orders", label: "Заказы" },
    ];

    return (
        <nav className="admin-nav">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={location.pathname === link.path ? "active" : ""}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};

export default AdminNav;

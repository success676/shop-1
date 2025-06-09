import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './AdminNav.module.scss';

const AdminNav = () => {
    const location = useLocation();

    const links = [
        { path: "/admin/dashboard", label: "Аналитика", icon: "📊" },
        { path: "/admin/users", label: "Пользователи", icon: "👥" },
        { path: "/admin/products", label: "Продукты", icon: "🛍️" },
        // { path: "/admin/orders", label: "Заказы", icon: "📦" },
    ];

    return (
        <nav className={styles.adminNav}>
            <div className={styles.navContainer}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`${styles.navLink} ${
                            location.pathname === link.path ? styles.active : ""
                        }`}
                    >
                        <span className={styles.linkIcon}>{link.icon}</span>
                        <span className={styles.linkText}>{link.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default AdminNav;
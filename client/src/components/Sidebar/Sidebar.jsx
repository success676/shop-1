import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineDeleteSweep, MdMenu, MdClose } from "react-icons/md";
import styles from './Sidebar.module.scss';

export const Sidebar = ({ onFilterChange, onResetFilters }) => {
    const location = useLocation();
    const { categories } = useSelector((state) => state.categories);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [filters, setFilters] = useState({
        gender: "",
        category: "",
        subcategory: "",
    });
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMobileOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (mobileOpen && event.key === "Escape") {
                setMobileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [mobileOpen]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        if (location.pathname === "/main") {
            onFilterChange(name, value);
        } else {
            toast("Фильтрация доступна на странице шопинг.");
        }
        if (window.innerWidth <= 768) {
            setMobileOpen(false);
        }
    };

    const handleResetFilters = () => {
        setFilters({
            gender: "",
            category: "",
            subcategory: "",
        });
        onResetFilters();
    };

    const isMainPage = location.pathname === "/main";

    return (
        <>
            <button 
                className={styles.mobileMenuButton}
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>

            {mobileOpen && <div className={styles.overlay} />}

            <aside 
                ref={sidebarRef}
                className={`${styles.root} ${mobileOpen ? styles.mobileOpen : ''}`}
            >
                <div className={styles.sidebarContent}>
                    <div className="sidebar-list">
                        <div className={styles.sidebarTopRow}>
                            <span>Пол</span>
                            {isMainPage ? (
                                <div
                                    className={`${styles.sidebarBtnReset} mr-25`}
                                    onClick={handleResetFilters}
                                >
                                    <MdOutlineDeleteSweep size={25} />
                                    <span>Сбросить</span>
                                </div>
                            ) : null}
                        </div>
                        <ul>
                            <li>
                                <label className="cu-p">
                                    <input
                                        className="mr-10 cu-p"
                                        type="radio"
                                        name="gender"
                                        value=""
                                        onChange={handleFilterChange}
                                        checked={filters.gender === ""}
                                        disabled={!isMainPage}
                                    />
                                    Все товары
                                </label>
                            </li>
                            <li>
                                <label className="cu-p">
                                    <input
                                        className="mr-10 cu-p"
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onChange={handleFilterChange}
                                        checked={filters.gender === "male"}
                                        disabled={!isMainPage}
                                    />
                                    Мужская одежда
                                </label>
                            </li>
                            <li>
                                <label className="cu-p">
                                    <input
                                        className="mr-10 cu-p"
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onChange={handleFilterChange}
                                        checked={filters.gender === "female"}
                                        disabled={!isMainPage}
                                    />
                                    Женская одежда
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-list">
                        Категории:
                        <ul>
                            <li>
                                <label className="cu-p">
                                    <input
                                        className="mr-10 cu-p"
                                        type="radio"
                                        name="category"
                                        value=""
                                        onChange={handleFilterChange}
                                        checked={filters.category === ""}
                                        disabled={!isMainPage}
                                    />
                                    Все категории
                                </label>
                            </li>
                            {categories.map((category) => (
                                <li key={category._id}>
                                    <label className="cu-p">
                                        <input
                                            className="mr-10 cu-p"
                                            type="radio"
                                            name="category"
                                            value={category._id}
                                            onChange={handleFilterChange}
                                            checked={
                                                filters.category === category._id
                                            }
                                            disabled={!isMainPage}
                                        />
                                        {category.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    );
};
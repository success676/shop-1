// src/components/Sidebar/Sidebar.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { MdOutlineDeleteSweep } from "react-icons/md";

export const Sidebar = ({ onFilterChange, onResetFilters }) => {
    const location = useLocation();
    const { categories } = useSelector((state) => state.categories);

    const [filters, setFilters] = useState({
        gender: "",
        category: "",
        subcategory: "",
    });

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
        <aside className="sidebar bg-sidebar">
            <div className="sidebar-content">
                <div className="sidebar-list">
                    <div className="sidebar-row-btn">
                        <span>Пол</span>
                        {isMainPage ? (
                            <div
                                className="sidebar-btns mr-25"
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
    );
};

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { MdLogout, MdOutlineDeleteSweep } from "react-icons/md";

import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { clearFavorites } from "../../redux/features/favorites/favoritesSlice";
import { clearPurchases } from "../../redux/features/purchase/purchaseSlice";

export const Sidebar = ({ onFilterChange, onResetFilters }) => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [filters, setFilters] = useState({
        gender: "",
        category: "",
        subcategory: "",
    });

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearFavorites());
        dispatch(clearPurchases());
        window.localStorage.removeItem("token");
        toast("Вы вышли из системы.");

        navigate("/");
    };

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
                            <label>
                                <input
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
                            <label>
                                <input
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
                            <label>
                                <input
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
                            <label>
                                <input
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
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="t-shirts"
                                    onChange={handleFilterChange}
                                    checked={filters.category === "t-shirts"}
                                    disabled={!isMainPage}
                                />
                                Футболки
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="shorts"
                                    onChange={handleFilterChange}
                                    checked={filters.category === "shorts"}
                                    disabled={!isMainPage}
                                />
                                Шорты
                            </label>
                        </li>
                        {/* <li>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="pants"
                                    onChange={handleFilterChange}
                                    checked={filters.category === "pants"}
                                    disabled={!isMainPage}
                                />
                                Брюки
                            </label>
                        </li> */}
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="shoes"
                                    onChange={handleFilterChange}
                                    checked={filters.category === "shoes"}
                                    disabled={!isMainPage}
                                />
                                Обувь
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="underwear"
                                    onChange={handleFilterChange}
                                    checked={filters.category === "underwear"}
                                    disabled={!isMainPage}
                                />
                                Нижнее белье
                            </label>
                        </li>
                    </ul>
                </div>
                {/* <div className="sidebar-list">
                    Подкатегории:
                    <ul>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="subcategory"
                                    value=""
                                    onChange={handleFilterChange}
                                    checked={filters.subcategory === ""}
                                    disabled={!isMainPage}
                                />
                                Все
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="subcategory"
                                    value="male"
                                    onChange={handleFilterChange}
                                    checked={filters.subcategory === "male"}
                                    disabled={!isMainPage}
                                />
                                Тест1
                            </label>
                        </li>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="subcategory"
                                    value="female"
                                    onChange={handleFilterChange}
                                    checked={filters.subcategory === "female"}
                                    disabled={!isMainPage}
                                />
                                Тест2
                            </label>
                        </li>
                    </ul>
                </div> */}
            </div>
            <div className="sidebar-btns">
                {isAuth ? (
                    <>
                        <MdLogout size={25} />
                        <span onClick={logoutHandler}>Выйти</span>
                    </>
                ) : null}
            </div>
        </aside>
    );
};

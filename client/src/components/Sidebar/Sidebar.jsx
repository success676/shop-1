import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";

import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { clearFavorites } from "../../redux/features/favorites/favoritesSlice";
import { clearPurchases } from "../../redux/features/purchase/purchaseSlice";

export const Sidebar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearFavorites());
        dispatch(clearPurchases());
        window.localStorage.removeItem("token");
        toast("Вы вышли из системы.");

        navigate("/");
    };
    return (
        <aside className="sidebar bg-sidebar">
            <div className="sidebar-list">
                Категории:
                <ul>
                    <li>Все товары</li>
                    <li>Мужская одежда</li>
                    <li>Женская одежда</li>
                    <li>Детская одежда</li>
                    <li>Техника</li>
                    <li>Для дома</li>
                    <li>Еда</li>
                </ul>
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

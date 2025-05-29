import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { clearFavorites } from "../../redux/features/favorites/favoritesSlice";
import { clearPurchases } from "../../redux/features/purchase/purchaseSlice";
import AppContext from "../../context";
import {
    MdAdminPanelSettings,
    MdAccountCircle,
    MdShoppingCart,
    MdFavorite,
    MdCreditScore,
    MdOutlineStorefront,
    MdLogin,
    MdLogout,
    MdManageAccounts,
    MdMenu,
    MdClose,
} from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./Header.module.scss";

function Header() {
    const { setCartOpened } = React.useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const { totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = useRef();
    const mobileMenuRef = useRef();

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearFavorites());
        dispatch(clearPurchases());
        window.localStorage.removeItem("token");
        toast("Вы вышли из системы.");
        navigate("/");
        setIsMobileMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
        if (
            mobileMenuRef.current &&
            !mobileMenuRef.current.contains(event.target) &&
            !event.target.closest(`.${styles.mobileMenuButton}`)
        ) {
            setIsMobileMenuOpen(false);
        }
    };

    const handleEscapeKey = (event) => {
        if (event.key === "Escape") {
            setIsMenuOpen(false);
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    return (
        <header
            className={`d-flex justify-between align-center ${styles.root}`}
        >
            <div className="d-flex align-center">
                <Link to="/home" className={styles.logoLink}>
                    <button className={styles.logoBtn} data-text="Awesome">
                        <span className={styles.logoText}>
                            &nbsp;Cailin Kelai&nbsp;
                        </span>
                        <span className={styles.logoTextHover}>
                            &nbsp;Cailin&nbsp;Kelai&nbsp;
                        </span>
                    </button>
                </Link>
                <Link className={`ml-40 ${styles.desktopLink}`} to="/main">
                    <div className="cu-p d-flex align-center">
                        <MdOutlineStorefront className="mr-10" size={25} />
                        <p>На шопинг!</p>
                    </div>
                </Link>
            </div>

            {/* Мобильное меню кнопка */}
            <button
                className={styles.mobileMenuButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <MdClose size={30} />
                ) : (
                    <MdMenu size={30} />
                )}
            </button>

            {/* Десктопное меню */}
            {isAuth ? (
                <div className={`d-flex align-center ${styles.desktopMenu}`}>
                    <ul className="d-flex align-center">
                        {user && user.role === "admin" && (
                            <Link to="/admin/dashboard">
                                <li className="mr-30 cu-p d-flex align-center">
                                    <MdAdminPanelSettings
                                        className="mr-10"
                                        size={25}
                                    />
                                    <p>Админ панель</p>
                                </li>
                            </Link>
                        )}
                        <li
                            onClick={() => setCartOpened(true)}
                            className="mr-30 cu-p d-flex align-center"
                        >
                            <MdShoppingCart className="mr-10" size={25} />
                            <span>{totalPrice} руб.</span>
                        </li>
                        <Link className="mr-30" to="/favorites">
                            <li className="cu-p d-flex align-center">
                                <MdFavorite className="mr-10" size={25} />
                                <p>Закладки</p>
                            </li>
                        </Link>
                        <li
                            className={`d-flex align-center ${styles.profileButton}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            ref={menuRef}
                        >
                            <MdAccountCircle className="mr-10" size={25} />
                            <p>Профиль</p>
                            {isMenuOpen && (
                                <div className={styles.dropdownMenu}>
                                    <Link
                                        to="/profile"
                                        className={styles.dropdownItem}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <MdManageAccounts size={20} />
                                        <span>Аккаунт</span>
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className={styles.dropdownItem}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <MdCreditScore size={20} />
                                        <span>Мои заказы</span>
                                    </Link>
                                    <div
                                        className={styles.dropdownItem}
                                        onClick={logoutHandler}
                                    >
                                        <MdLogout size={20} />
                                        <span>Выйти</span>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            ) : (
                <div className={styles.desktopMenu}>
                    <Link to="/login">
                        <div className="d-flex align-center">
                            <MdLogin className="mr-10" size={25} />
                            <span>Войти</span>
                        </div>
                    </Link>
                </div>
            )}

            {/* Мобильное меню */}
            {isMobileMenuOpen && <div className={styles.mobileMenuOverlay} />}
            <div
                ref={mobileMenuRef}
                className={`${styles.mobileMenu} ${
                    isMobileMenuOpen ? styles.mobileMenuOpen : ""
                }`}
            >
                {isAuth ? (
                    <>
                        <Link
                            to="/main"
                            className={styles.mobileMenuItem}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdOutlineStorefront className="mr-10" size={25} />
                            <span>На шопинг!</span>
                        </Link>

                        {user && user.role === "admin" && (
                            <Link
                                to="/admin/dashboard"
                                className={styles.mobileMenuItem}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <MdAdminPanelSettings
                                    className="mr-10"
                                    size={25}
                                />
                                <span>Админ панель</span>
                            </Link>
                        )}

                        <div
                            className={styles.mobileMenuItem}
                            onClick={() => {
                                setCartOpened(true);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <MdShoppingCart className="mr-10" size={25} />
                            <span>Корзина ({totalPrice} руб.)</span>
                        </div>

                        <Link
                            to="/favorites"
                            className={styles.mobileMenuItem}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdFavorite className="mr-10" size={25} />
                            <span>Закладки</span>
                        </Link>

                        <Link
                            to="/profile"
                            className={styles.mobileMenuItem}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdAccountCircle className="mr-10" size={25} />
                            <span>Профиль</span>
                        </Link>

                        <Link
                            to="/orders"
                            className={styles.mobileMenuItem}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdCreditScore className="mr-10" size={25} />
                            <span>Мои заказы</span>
                        </Link>

                        <div
                            className={styles.mobileMenuItem}
                            onClick={logoutHandler}
                        >
                            <MdLogout className="mr-10" size={25} />
                            <span>Выйти</span>
                        </div>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className={styles.mobileMenuItem}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <MdLogin className="mr-10" size={25} />
                        <span>Войти</span>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;

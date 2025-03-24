import React from "react";
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
} from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./Header.module.scss";

function Header(props) {
    const { setCartOpened } = React.useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const { totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = React.useRef();

    const logoutHandler = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearFavorites());
        dispatch(clearPurchases());
        window.localStorage.removeItem("token");
        toast("Вы вышли из системы.");
        navigate("/");
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const handleEscapeKey = (event) => {
        if (event.key === "Escape") {
            setIsMenuOpen(false);
        }
    };

    React.useEffect(() => {
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
                <Link to="/home">
                    <button className={styles.logoBtn} data-text="Awesome">
                        <span className="logo__text">
                            &nbsp;Cailin Kelai&nbsp;
                        </span>
                        <span
                            aria-hidden="true"
                            className={styles.logoTextHover}
                        >
                            &nbsp;Cailin&nbsp;Kelai&nbsp;
                        </span>
                    </button>
                </Link>
                <Link className="ml-40" to="/main">
                    <div className="cu-p d-flex align-center">
                        <MdOutlineStorefront className="mr-10" size={25} />
                        <p className="">На шопинг!</p>
                    </div>
                </Link>
            </div>
            {isAuth ? (
                <div className="d-flex align-center">
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
                                    >
                                        <MdManageAccounts size={20} />
                                        <span>Аккаунт</span>
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className={styles.dropdownItem}
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
                <Link to="/login">
                    <div className="d-flex align-center">
                        <MdLogin className="mr-10" size={25} />
                        <span>Войти</span>
                    </div>
                </Link>
            )}
        </header>
    );
}

export default Header;

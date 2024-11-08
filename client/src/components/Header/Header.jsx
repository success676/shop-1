import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../../redux/features/auth/authSlice";
import {
    MdAdminPanelSettings,
    MdAccountCircle,
    MdShoppingCart,
    MdFavorite,
    MdCreditScore,
} from "react-icons/md";

function Header(props) {
    const { setCartOpened } = React.useContext(AppContext);

    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);

    const { totalPrice } = useSelector((state) => state.cart);

    return (
        <header className="d-flex justify-between align-center">
            <Link to="/">
                <button className="logo__btn" data-text="Awesome">
                    <span className="logo__text">&nbsp;Cailin Kelai&nbsp;</span>
                    <span aria-hidden="true" className="logo__text-hover">
                        &nbsp;Cailin&nbsp;Kelai&nbsp;
                    </span>
                </button>
            </Link>
            {isAuth ? (
                <ul className="d-flex align-center">
                    {user && user.admin && (
                        <li
                            onClick={() => alert("Вы админ")}
                            className="mr-30 cu-p d-flex align-center"
                        >
                            <MdAdminPanelSettings className="mr-10" size={25} />
                            <p>Админ панель</p>
                        </li>
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
                    <Link className="mr-30" to="/orders">
                        <li className="d-flex align-center">
                            <MdCreditScore className="mr-10" size={25} />
                            <p>Мои заказы</p>
                        </li>
                    </Link>
                    <Link to="/profile">
                        <li className="d-flex align-center">
                            <MdAccountCircle className="mr-10" size={25} />
                            <p>Профиль</p>
                        </li>
                    </Link>
                </ul>
            ) : null}
        </header>
    );
}

export default Header;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    createPurchase,
    getPurchases,
} from "../redux/features/purchase/purchaseSlice";
import { clearCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import NoItems from "../components/NoItems";

import config from "../config";

const Checkout = () => {
    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const { address } = user?.contactInfo || {};
    const { cart, totalPrice, totalTax } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isAuth) {
        return (
            <div className="content p-40 all-pages">
                <h1 className="">
                    Чтобы оформить покупку вам нужно авторизоваться.
                </h1>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        try {
            await dispatch(createPurchase(user._id)).unwrap();
            dispatch(clearCart());
            dispatch(getPurchases(user._id));
            toast.success("Заказ успешно оформлен!");
            navigate("/main");
        } catch (error) {
            toast.error("Ошибка при создании заказа");
        }
    };

    return (
        <div className="content p-40 all-pages checkout-page">
            <h1 className="">Оформление заказа</h1>
            {cart.length > 0 ? (
                <div className="checkout-page-row">
                    <div className="cart-summary">
                        <h2>Сведения о заказе</h2>
                        <ul>
                            {cart.map((item, index) => (
                                <li className="d-flex align-center" key={index}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${config.apiUrl}/${config.imgGoods}/${item.product.imageUrl})`,
                                        }}
                                        className="cartItemImg"
                                    ></div>
                                    <p className="cart-summary-desc">
                                        {item.product.title} -{" "}
                                        {item.product.price} руб.
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <p>Сумма: {totalPrice} руб.</p>
                        <p className="mb-40">Налог: {totalTax} руб.</p>
                        <p>
                            Итого: {Number(totalPrice) + Number(totalTax)} руб.
                        </p>
                        <div className="button-container">
                            <button
                                onClick={handlePlaceOrder}
                                className="greenButton"
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                    <div className="address-section">
                        <h2>Адрес доставки</h2>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="address"
                                    value="saved"
                                />
                                Ваш сохраненный адрес
                            </label>
                            {address && (
                                <div>
                                    <p>
                                        {address.city}, {address.state},{" "}
                                        {address.street}, {address.zip}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="address"
                                    value="new"
                                />
                                Добавить новый адрес
                            </label>
                            {/* Form for entering new address */}
                        </div>
                    </div>
                </div>
            ) : (
                <NoItems
                    title="У вас пустая корзина."
                    description="Добавьте хотя бы один товар в корзину чтобы оформить заказ."
                    buttonText="На шопинг!"
                    imageUrl="./img/sad-face3.jpg"
                />
            )}
        </div>
    );
};

export default Checkout;

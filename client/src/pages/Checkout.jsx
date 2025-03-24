import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    createPurchase,
    getPurchases,
} from "../redux/features/purchase/purchaseSlice";
import { clearCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import NoItems from "../components/NoItems/NoItems";
import config from "../utils/config";

import AddressModal from "../components/AddressModal/AddressModal";

import { addAddress } from "../redux/features/address/addressSlice";

const Checkout = () => {
    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);
    const { addresses } = user?.contactInfo || {};
    const { cart, totalPrice, totalTax } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        if (!selectedAddress) {
            toast.error("Пожалуйста, выберите адрес доставки.");
            return;
        }

        try {
            await dispatch(
                createPurchase({ userId: user._id, address: selectedAddress })
            ).unwrap();
            dispatch(clearCart());
            dispatch(getPurchases(user._id));
            toast.success("Заказ успешно оформлен!");
            navigate("/main");
        } catch (error) {
            toast.error("Ошибка при создании заказа");
        }
    };

    const closeModalHandler = () => {
        setIsModalOpen(false);
    };

    const saveNewAddressHandler = (address) => {
        dispatch(addAddress({ userId: user._id, address }));
    };

    const openModalHandler = () => {
        if (addresses.length >= 5) {
            toast.error("Вы не можете добавить больше 5 адресов.");
        } else {
            setIsModalOpen(true);
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
                        {addresses && addresses.length > 0 ? (
                            addresses.map((address, index) => (
                                <div key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="address"
                                            value={JSON.stringify(address)}
                                            onChange={() =>
                                                setSelectedAddress(address)
                                            }
                                        />
                                        {address.state}, {address.city},{" "}
                                        {address.street}, {address.zip}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>
                                Нет сохраненных адресов. Пожалуйста, добавьте
                                новый адрес.
                            </p>
                        )}
                        <div>
                            <button onClick={openModalHandler}>
                                Добавить новый адрес
                            </button>
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

            <AddressModal
                isOpen={isModalOpen}
                onClose={closeModalHandler}
                onSave={saveNewAddressHandler}
            />
        </div>
    );
};

export default Checkout;

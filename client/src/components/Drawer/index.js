import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createPurchase,
    getPurchases,
} from "../../redux/features/purchase/purchaseSlice";
import {
    removeCartItem,
    getCart,
    clearCart,
} from "../../redux/features/cart/cartSlice";
import { selectUserId } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Info from "../Info";
import styles from "./Drawer.module.scss";

const Drawer = ({ onClose, opened }) => {
    const dispatch = useDispatch();
    const { cart, totalPrice, totalTax } = useSelector((state) => state.cart);
    const userId = useSelector(selectUserId);

    const handleRemoveFromCart = (productId) => {
        if (userId) {
            dispatch(removeCartItem({ userId, productId }));
        } else {
            toast.error("Пользователь не авторизован");
        }
    };

    useEffect(() => {
        if (userId) {
            dispatch(getCart(userId));
        }
    }, [dispatch, userId]);

    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            await dispatch(createPurchase(userId)).unwrap();
            setIsOrderComplete(true);
            setIsLoading(false);
            dispatch(clearCart());
            dispatch(getPurchases(userId));
        } catch (error) {
            toast.error("Ошибка при создании заказа");
            setIsLoading(false);
        }
    };

    const handleClickOutside = useCallback(
        (event) => {
            if (event.target.classList.contains(styles.overlay)) {
                onClose();
            }
        },
        [onClose]
    );

    const handleEscapeKey = useCallback(
        (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (opened) {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [opened, handleClickOutside, handleEscapeKey]);

    return (
        <div
            className={`${styles.overlay} ${
                opened ? styles.overlayVisible : ""
            }`}
        >
            <div className={`${styles.drawer}`}>
                <h2 className="d-flex justify-between mb-30">
                    Корзина{" "}
                    <img
                        onClick={onClose}
                        className="cu-p"
                        src="./img/btn-remove.svg"
                        alt="Close"
                    />
                </h2>

                {cart.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items flex">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="cartItem d-flex align-center mb-20"
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${item.product.imageUrl})`,
                                        }}
                                        className="cartItemImg"
                                    ></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">
                                            {item.product.title}
                                        </p>
                                        <b>{item.product.price} руб.</b>
                                    </div>
                                    <img
                                        onClick={() =>
                                            handleRemoveFromCart(
                                                item.product._id
                                            )
                                        }
                                        className="removeBtn"
                                        src="./img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalTax} руб.</b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                onClick={onClickOrder}
                                className="greenButton"
                            >
                                Оформить заказ{" "}
                                <img src="./img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={
                            isOrderComplete
                                ? "Заказ оформлен!"
                                : "Корзина пустая"
                        }
                        description={
                            isOrderComplete
                                ? "Ваш заказ скоро будет передан курьерской доставке"
                                : "Добавьте хотя бы один товар, чтобы сделать заказ."
                        }
                        image={
                            isOrderComplete
                                ? "./img/complete-order.jpg"
                                : "./img/empty-cart.jpg"
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;

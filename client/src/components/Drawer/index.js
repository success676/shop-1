import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    removeCartItem,
    getCart,
    checkStock,
    updateCartItemQuantity,
} from "../../redux/features/cart/cartSlice";
import { selectUserId } from "../../redux/features/auth/authSlice";

import Info from "../Info/Info";

import config from "../../utils/config";

import { toast } from "react-toastify";
import styles from "./Drawer.module.scss";

const Drawer = ({ onClose, opened }) => {
    const dispatch = useDispatch();
    const { cart, totalPrice, totalTax } = useSelector((state) => state.cart);
    const userId = useSelector(selectUserId);
    const navigate = useNavigate();

    const handleRemoveFromCart = (productId) => {
        if (userId) {
            dispatch(removeCartItem({ userId, productId }));
        } else {
            toast.error("Пользователь не авторизован");
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        if (userId) {
            dispatch(updateCartItemQuantity({ userId, productId, quantity: newQuantity }));
        } else {
            toast.error("Пользователь не авторизован");
        }
    };

    React.useEffect(() => {
        if (userId) {
            dispatch(getCart(userId));
        }
    }, [dispatch, userId]);

    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const resultAction = await dispatch(checkStock(userId));
            if (checkStock.fulfilled.match(resultAction)) {
                onClose();
                navigate("/checkout");
            } else {
                toast.error(resultAction.payload.message);
            }
            setIsLoading(false);
        } catch (error) {
            toast.error("Ошибка при проверке наличия товаров");
            setIsLoading(false);
        }
    };

    const handleClickOutside = React.useCallback(
        (event) => {
            if (event.target.classList.contains(styles.overlay)) {
                onClose();
            }
        },
        [onClose]
    );

    const handleEscapeKey = React.useCallback(
        (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    React.useEffect(() => {
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
            <div className={styles.drawer}>
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
                    <div className={styles.cartWrapper}>
                        <div className={styles.itemsWrapper}>
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${styles.cartItem} d-flex align-center mb-20`}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${config.apiUrl}/${config.imgGoods}/${item.product.imageUrl})`,
                                        }}
                                        className={styles.cartItemImg}
                                    ></div>
                                    <div className={`${styles.cartItemInfo} mr-20 flex`}>
                                        <p className="mb-5">
                                            {item.product.title}
                                        </p>
                                        <b>{item.product.price} руб.</b>
                                        <div className={styles.quantityControl}>
                                            <button 
                                                className={styles.quantityButton}
                                                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className={styles.quantityValue}>
                                                {item.quantity}
                                            </span>
                                            <button 
                                                className={styles.quantityButton}
                                                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        onClick={() =>
                                            handleRemoveFromCart(
                                                item.product._id
                                            )
                                        }
                                        className={styles.removeBtn}
                                        src="./img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Сумма:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalTax} руб.</b>
                                </li>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>
                                        {Number(totalPrice) + Number(totalTax)}{" "}
                                        руб.
                                    </b>
                                </li>
                            </ul>
                            <button
                                disabled={isLoading}
                                onClick={onClickOrder}
                                className={styles.greenButton}
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
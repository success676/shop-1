import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    createPurchase,
    getPurchases,
} from "../../redux/features/purchase/purchaseSlice";
import { clearCart, updateCartItemQuantity } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkIsAuth } from "../../redux/features/auth/authSlice";
import NoItems from "../../components/NoItems/NoItems";
import config from "../../utils/config";
import AddressModal from "../../components/AddressModal/AddressModal";
import { addAddress } from "../../redux/features/address/addressSlice";
import { FaShoppingBag, FaMapMarkerAlt, FaPlus, FaCheck, FaMinus } from "react-icons/fa";
import styles from "./Checkout.module.scss";

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
            <div className={`content p-40 all-pages ${styles.notAuthContainer}`}>
                <h1>Чтобы оформить покупку вам нужно авторизоваться.</h1>
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
        if (addresses?.length >= 5) {
            toast.error("Вы не можете добавить больше 5 адресов.");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        dispatch(updateCartItemQuantity({ userId: user._id, productId, quantity: newQuantity }));
    };

    const incrementQuantity = (productId, currentQuantity) => {
        handleQuantityChange(productId, currentQuantity + 1);
    };

    const decrementQuantity = (productId, currentQuantity) => {
        handleQuantityChange(productId, currentQuantity - 1);
    };

    return (
        <div className="content p-40 all-pages">
            <div className={styles.container}>
                <h1 className={styles.title}>Оформление заказа</h1>
                {cart.length > 0 ? (
                    <div className={styles.content}>
                        <div className={styles.orderSummary}>
                            <div className={styles.orderHeader}>
                                <h2 className={styles.sectionTitle}>
                                    <FaShoppingBag className={styles.icon} />
                                    Сведения о заказе
                                </h2>
                            </div>

                            <div className={styles.itemsScrollContainer}>
                                <ul className={styles.itemsList}>
                                    {cart.map((item, index) => (
                                        <li className={styles.item} key={index}>
                                            <div
                                                className={styles.itemImage}
                                                style={{
                                                    backgroundImage: `url(${config.apiUrl}/${config.imgGoods}/${item.product.imageUrl})`,
                                                }}
                                            />
                                            <div className={styles.itemDetails}>
                                                <p className={styles.itemTitle}>
                                                    {item.product.title}
                                                </p>
                                                <div className={styles.quantityControls}>
                                                    <p className={styles.itemPrice}>
                                                        {item.product.price} руб.
                                                    </p>
                                                    <div className={styles.quantityWrapper}>
                                                        <button
                                                            className={styles.quantityButton}
                                                            onClick={() => decrementQuantity(item.product._id, item.quantity)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                        <span className={styles.quantityValue}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className={styles.quantityButton}
                                                            onClick={() => incrementQuantity(item.product._id, item.quantity)}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.orderFooter}>
                                <div className={styles.summary}>
                                    <div className={styles.summaryRow}>
                                        <span>Сумма:</span>
                                        <span>{totalPrice} руб.</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>Налог 5%:</span>
                                        <span>{totalTax} руб.</span>
                                    </div>
                                    <div className={`${styles.summaryRow} ${styles.total}`}>
                                        <span>Итого:</span>
                                        <span>
                                            {Number(totalPrice) + Number(totalTax)} руб.
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePlaceOrder}
                                    className={styles.orderButton}
                                    disabled={!selectedAddress}
                                >
                                    <FaCheck className={styles.buttonIcon} />
                                    Оформить заказ
                                </button>
                            </div>
                        </div>

                        <div className={styles.addressSection}>
                            <div className={styles.addressHeader}>
                                <h2 className={styles.sectionTitle}>
                                    <FaMapMarkerAlt className={styles.icon} />
                                    Адрес доставки
                                </h2>
                                <button
                                    onClick={openModalHandler}
                                    className={styles.addButton}
                                >
                                    <FaPlus /> Добавить адрес
                                </button>
                            </div>

                            {addresses?.length > 0 ? (
                                <div className={styles.addressList}>
                                    {addresses.map((address, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.addressCard} ${
                                                selectedAddress?._id === address._id
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onClick={() => setSelectedAddress(address)}
                                        >
                                            <input
                                                type="radio"
                                                name="address"
                                                checked={selectedAddress?._id === address._id}
                                                onChange={() => setSelectedAddress(address)}
                                                className={styles.radioInput}
                                            />
                                            <div className={styles.addressDetails}>
                                                <p className={styles.addressLine}>
                                                    <strong>Адрес {index + 1}:</strong>
                                                </p>
                                                <p className={styles.addressLine}>
                                                    {address.state}, {address.city}
                                                </p>
                                                <p className={styles.addressLine}>
                                                    {address.street}, {address.zip}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyAddress}>
                                    <FaMapMarkerAlt className={styles.emptyIcon} />
                                    <p>Нет сохраненных адресов</p>
                                    <button
                                        onClick={openModalHandler}
                                        className={styles.addButton}
                                    >
                                        <FaPlus /> Добавить первый адрес
                                    </button>
                                </div>
                            )}
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
        </div>
    );
};

export default Checkout;
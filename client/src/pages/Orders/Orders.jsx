import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../../redux/features/purchase/purchaseSlice";
import { selectUserId } from "../../redux/features/auth/authSlice";
import Card from "../../components/Card";
import NoItems from "../../components/NoItems/NoItems";
import config from "../../utils/config";
import {
    FaShoppingBag,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaMoneyBillWave,
} from "react-icons/fa";
import styles from "./Orders.module.scss";

const Orders = () => {
    const dispatch = useDispatch();
    const { purchases } = useSelector((state) => state.purchases);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (userId) {
            dispatch(getPurchases(userId));
        }
    }, [dispatch, userId]);

    return (
        <div className={`content p-40 all-pages`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Мои заказы</h1>
                </div>

                <div className={styles.ordersContainer}>
                    {purchases.length > 0 ? (
                        purchases.map((purchase, purchaseIndex) => (
                            <div
                                key={purchaseIndex}
                                className={styles.orderContainer}
                            >
                                <div className={styles.orderHeader}>
                                    <div className={styles.orderInfo}>
                                        <div className={styles.infoItem}>
                                            <FaCalendarAlt
                                                className={styles.icon}
                                            />
                                            <span>
                                                Дата:{" "}
                                                {new Date(
                                                    purchase.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <FaMoneyBillWave
                                                className={styles.icon}
                                            />
                                            <span>
                                                Сумма: {purchase.totalPrice}{" "}
                                                руб.
                                            </span>
                                        </div>
                                    </div>

                                    {purchase.address && (
                                        <div className={styles.addressInfo}>
                                            <h3 className={styles.addressTitle}>
                                                <FaMapMarkerAlt
                                                    className={styles.icon}
                                                />
                                                Адрес доставки
                                            </h3>
                                            <p className={styles.addressText}>
                                                {purchase.address.state},{" "}
                                                {purchase.address.city},<br />
                                                {purchase.address.street},{" "}
                                                {purchase.address.zip}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.productsHeader}>
                                    <FaShoppingBag className={styles.icon} />
                                    <h3>Товары в заказе</h3>
                                </div>

                                <div className={styles.productsList}>
                                    {purchase.products &&
                                    purchase.products.length > 0 ? (
                                        purchase.products.map((item, index) => (
                                            <Card
                                                key={`${purchaseIndex}-${index}`}
                                                {...item.product}
                                                imageUrl={`${config.apiUrl}/${config.imgGoods}/${item.product.imageUrl}`}
                                                isOrderPage
                                                quantity={item.quantity}
                                            />
                                        ))
                                    ) : (
                                        <div className={styles.noProducts}>
                                            В этой покупке нет товаров
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoItems
                            title="У вас нет заказов"
                            description="Вы ничего не заказали? Оформите хотя бы один заказ."
                            buttonText="На шопинг!"
                            imageUrl="./img/sad-face.png"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;

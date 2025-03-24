import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchases } from "../redux/features/purchase/purchaseSlice";
import { selectUserId } from "../redux/features/auth/authSlice";
import Card from "../components/Card";
import NoItems from "../components/NoItems/NoItems";
import config from "../utils/config";

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
        <div className="content p-40 all-pages orders-page">
            <div className="header d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>
            <div className="orders-container">
                {purchases.length > 0 ? (
                    purchases.map((purchase, purchaseIndex) => (
                        <div key={purchaseIndex} className="order-container">
                            <h2>
                                Дата покупки:{" "}
                                {new Date(purchase.createdAt).toLocaleDateString()}
                            </h2>
                            <h3>Общая цена: {purchase.totalPrice} руб.</h3>
                            {purchase.address && (
                                <div className="address-info">
                                    <h4>Адрес доставки:</h4>
                                    <p>
                                        {purchase.address.state}, {purchase.address.city},{" "}
                                        {purchase.address.street}, {purchase.address.zip}
                                    </p>
                                </div>
                            )}
                            <div className="products-list">
                                {purchase.products && purchase.products.length > 0 ? (
                                    purchase.products.map((item, index) => (
                                        <Card
                                            key={`${purchaseIndex}-${index}`}
                                            {...item.product}
                                            imageUrl={`${config.apiUrl}/${config.imgGoods}/${item.product.imageUrl}`}
                                            isOrderPage
                                        />
                                    ))
                                ) : (
                                    <div>В этой покупке нет товаров</div>
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
    );
};

export default Orders;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPurchases } from "../redux/features/purchase/purchaseSlice";
import { selectUserId } from "../redux/features/auth/authSlice";

import Card from "../components/Card";

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
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {purchases.length > 0 ? (
                    purchases.map((purchase, purchaseIndex) =>
                        purchase.products && purchase.products.length > 0 ? (
                            purchase.products.map((item, index) => (
                                <Card
                                    key={`${purchaseIndex}-${index}`}
                                    {...item.product}
                                    isOrderPage
                                />
                            ))
                        ) : (
                            <div key={purchaseIndex}>
                                В этой покупке нет товаров
                            </div>
                        )
                    )
                ) : (
                    <div>Вы еще ничего не купили</div>
                )}
            </div>
        </div>
    );
};

export default Orders;

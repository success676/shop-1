import React from "react";
import { useSelector } from "react-redux";

const AdminOrders = () => {
    const { purchases, isLoading } = useSelector((state) => state.admin);

    if (isLoading) {
        return <div className="all-pages">Загрузка...</div>;
    }

    return (
        <div className="content p-40 all-pages">
            <div className="admin-dashboard">
                <h1 className="mb-20">Заказы</h1>
                <ul>
                    {Array.isArray(purchases) &&
                        purchases.map((purchase) => (
                            <li key={purchase._id}>
                                {purchase.user.username} - {purchase.status}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminOrders;

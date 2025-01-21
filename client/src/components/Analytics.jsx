import React from "react";
import {
    startOfToday,
    startOfWeek,
    startOfMonth,
    isAfter,
    isWithinInterval
} from 'date-fns';

const Analytics = ({ purchases }) => {
    if (!Array.isArray(purchases)) {
        return <div>Нет доступных данных</div>;
    }

    const today = startOfToday();
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const monthStart = startOfMonth(new Date());

    const todayPurchases = purchases.filter(
        (purchase) => isAfter(new Date(purchase.createdAt), today)
    );
    const thisWeekPurchases = purchases.filter(
        (purchase) => isWithinInterval(new Date(purchase.createdAt), { start: weekStart, end: new Date() })
    );
    const thisMonthPurchases = purchases.filter(
        (purchase) => isWithinInterval(new Date(purchase.createdAt), { start: monthStart, end: new Date() })
    );

    const calculateRevenue = (purchases) =>
        purchases.reduce((total, purchase) => total + purchase.totalPrice, 0);

    return (
        <div className="analytics-container">
            <div className="analytics-section">
                <h2>Заказы</h2>
                <div className="analytics-cards">
                    <div className="analytics-card">
                        <div className="analytics-item">
                            <span className="analytics-label">Сегодня:</span>
                            <span className="analytics-value">{todayPurchases.length}</span>
                            <span className="analytics-subtext">заказов</span>
                        </div>
                    </div>
                    <div className="analytics-card">
                        <div className="analytics-item">
                            <span className="analytics-label">На этой неделе:</span>
                            <span className="analytics-value">{thisWeekPurchases.length}</span>
                            <span className="analytics-subtext">заказов</span>
                        </div>
                    </div>
                    <div className="analytics-card">
                        <div className="analytics-item">
                            <span className="analytics-label">В этом месяце:</span>
                            <span className="analytics-value">{thisMonthPurchases.length}</span>
                            <span className="analytics-subtext">заказов</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="analytics-section">
                <h2>Доход</h2>
                <div className="analytics-cards">
                    <div className="analytics-card">
                        <div className="analytics-item">
                            <span className="analytics-label">Сегодня:</span>
                            <span className="analytics-value">{calculateRevenue(todayPurchases)} ₽</span>
                        </div>
                    </div>
                    <div className="analytics-card">
                        <div className="analytics-item">
                            <span className="analytics-label">На этой неделе:</span>
                            <span className="analytics-value">{calculateRevenue(thisWeekPurchases)} ₽</span>
                        </div>
                    </div>
                    <div className="analytics-card">
                        <div className="analytics-item">
                            <span className="analytics-label">В этом месяце:</span>
                            <span className="analytics-value">{calculateRevenue(thisMonthPurchases)} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;

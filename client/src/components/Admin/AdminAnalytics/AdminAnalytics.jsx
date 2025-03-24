import React from "react";

import {
    startOfToday,
    startOfWeek,
    startOfMonth,
    isAfter,
    isWithinInterval
} from 'date-fns';

import styles from './AdminAnalytics.module.scss'

const AdminAnalytics = ({ purchases }) => {
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
        <div className={styles.root}>
            <div className={styles.analyticsSection}>
                <h2>Заказы</h2>
                <div className={styles.analyticsCards}>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsItem}>
                            <span className={styles.analyticsLabel}>Сегодня:</span>
                            <span className={styles.analyticsValue}>{todayPurchases.length}</span>
                            <span className={styles.analyticsSubtext}>заказов</span>
                        </div>
                    </div>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsItem}>
                            <span className={styles.analyticsLabel}>На этой неделе:</span>
                            <span className={styles.analyticsValue}>{thisWeekPurchases.length}</span>
                            <span className={styles.analyticsSubtext}>заказов</span>
                        </div>
                    </div>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsItem}>
                            <span className={styles.analyticsLabel}>В этом месяце:</span>
                            <span className={styles.analyticsValue}>{thisMonthPurchases.length}</span>
                            <span className={styles.analyticsSubtext}>заказов</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.analyticsSection}>
                <h2>Доход</h2>
                <div className={styles.analyticsCards}>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsItem}>
                            <span className={styles.analyticsLabel}>Сегодня:</span>
                            <span className={styles.analyticsValue}>{calculateRevenue(todayPurchases)} ₽</span>
                        </div>
                    </div>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsItem}>
                            <span className={styles.analyticsLabel}>На этой неделе:</span>
                            <span className={styles.analyticsValue}>{calculateRevenue(thisWeekPurchases)} ₽</span>
                        </div>
                    </div>
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsItem}>
                            <span className={styles.analyticsLabel}>В этом месяце:</span>
                            <span className={styles.analyticsValue}>{calculateRevenue(thisMonthPurchases)} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;

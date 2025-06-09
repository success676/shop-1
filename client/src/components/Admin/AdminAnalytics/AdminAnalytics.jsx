import React from "react";
import {
    startOfToday,
    startOfWeek,
    startOfMonth,
    startOfYear,
    isAfter,
    isWithinInterval,
} from "date-fns";
import {
    FiPackage,
    FiCalendar,
    FiDollarSign,
    FiTrendingUp,
    FiCreditCard,
    FiBarChart2,
} from "react-icons/fi";
import styles from "./AdminAnalytics.module.scss";

const AdminAnalytics = ({ purchases }) => {
    if (!Array.isArray(purchases)) {
        return <div className={styles.noData}>Нет доступных данных</div>;
    }

    const today = startOfToday();
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const monthStart = startOfMonth(new Date());
    const yearStart = startOfYear(new Date());

    const todayPurchases = purchases.filter((purchase) =>
        isAfter(new Date(purchase.createdAt), today)
    );
    const thisWeekPurchases = purchases.filter((purchase) =>
        isWithinInterval(new Date(purchase.createdAt), {
            start: weekStart,
            end: new Date(),
        })
    );
    const thisMonthPurchases = purchases.filter((purchase) =>
        isWithinInterval(new Date(purchase.createdAt), {
            start: monthStart,
            end: new Date(),
        })
    );
    const thisYearPurchases = purchases.filter((purchase) =>
        isWithinInterval(new Date(purchase.createdAt), {
            start: yearStart,
            end: new Date(),
        })
    );

    const calculateRevenue = (purchases) =>
        purchases.reduce((total, purchase) => total + purchase.totalPrice, 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>Аналитика продаж</h1>

            <div className={styles.analyticsSection}>
                <h2>Заказы</h2>
                <div className={styles.analyticsCards}>
                    <div className={`${styles.analyticsCard} ${styles.today}`}>
                        <div className={styles.analyticsItem}>
                            <FiPackage className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                Сегодня
                            </span>
                            <span className={styles.analyticsValue}>
                                {todayPurchases.length}
                            </span>
                            <span className={styles.analyticsSubtext}>
                                заказов
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.analyticsCard} ${styles.week}`}>
                        <div className={styles.analyticsItem}>
                            <FiCalendar className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                На этой неделе
                            </span>
                            <span className={styles.analyticsValue}>
                                {thisWeekPurchases.length}
                            </span>
                            <span className={styles.analyticsSubtext}>
                                заказов
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.analyticsCard} ${styles.month}`}>
                        <div className={styles.analyticsItem}>
                            <FiTrendingUp className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                В этом месяце
                            </span>
                            <span className={styles.analyticsValue}>
                                {thisMonthPurchases.length}
                            </span>
                            <span className={styles.analyticsSubtext}>
                                заказов
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.analyticsCard} ${styles.year}`}>
                        <div className={styles.analyticsItem}>
                            <FiBarChart2 className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                В этом году
                            </span>
                            <span className={styles.analyticsValue}>
                                {thisYearPurchases.length}
                            </span>
                            <span className={styles.analyticsSubtext}>
                                заказов
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.analyticsSection}>
                <h2>Доход</h2>
                <div className={styles.analyticsCards}>
                    <div
                        className={`${styles.analyticsCard} ${styles.revenueToday}`}
                    >
                        <div className={styles.analyticsItem}>
                            <FiDollarSign className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                Сегодня
                            </span>
                            <span className={styles.analyticsValue}>
                                {formatCurrency(
                                    calculateRevenue(todayPurchases)
                                )}
                            </span>
                        </div>
                    </div>
                    <div
                        className={`${styles.analyticsCard} ${styles.revenueWeek}`}
                    >
                        <div className={styles.analyticsItem}>
                            <FiCreditCard className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                На этой неделе
                            </span>
                            <span className={styles.analyticsValue}>
                                {formatCurrency(
                                    calculateRevenue(thisWeekPurchases)
                                )}
                            </span>
                        </div>
                    </div>
                    <div
                        className={`${styles.analyticsCard} ${styles.revenueMonth}`}
                    >
                        <div className={styles.analyticsItem}>
                            <FiTrendingUp className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                В этом месяце
                            </span>
                            <span className={styles.analyticsValue}>
                                {formatCurrency(
                                    calculateRevenue(thisMonthPurchases)
                                )}
                            </span>
                        </div>
                    </div>
                    <div
                        className={`${styles.analyticsCard} ${styles.revenueYear}`}
                    >
                        <div className={styles.analyticsItem}>
                            <FiBarChart2 className={styles.cardIconFront} />
                            <span className={styles.analyticsLabel}>
                                В этом году
                            </span>
                            <span className={styles.analyticsValue}>
                                {formatCurrency(
                                    calculateRevenue(thisYearPurchases)
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;

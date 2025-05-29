import React from "react";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";

function Card({
    id,
    title,
    imageUrl,
    price,
    onFavorite,
    onPlus,
    isItemAdded,
    isItemFavorited,
    loading,
    isOrderPage,
    onClick,
    quantity, // Добавлен пропс для количества
}) {
    const { loading: productsLoading } = useSelector((state) => state.products);

    const onClickPlus = () => {
        if (!loading) {
            onPlus({ id, title, imageUrl, price });
        }
    };

    const onClickFavorite = () => {
        if (!loading) {
            onFavorite(id);
        }
    };

    return (
        <div className={styles.card} onClick={onClick}>
            {productsLoading ? (
                <ContentLoader
                    speed={2}
                    width={160}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect
                        x="1"
                        y="0"
                        rx="10"
                        ry="10"
                        width="155"
                        height="155"
                    />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect
                        x="124"
                        y="230"
                        rx="10"
                        ry="10"
                        width="32"
                        height="32"
                    />
                </ContentLoader>
            ) : (
                <>
                    {!isOrderPage && (
                        <div
                            className={styles.favorite}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClickFavorite();
                            }}
                        >
                            <img
                                src={
                                    isItemFavorited
                                        ? "./img/liked.svg"
                                        : "./img/unliked.svg"
                                }
                                alt="Unliked"
                            />
                        </div>
                    )}

                    <img
                        width="100%"
                        height={135}
                        src={imageUrl}
                        alt="Product"
                    />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                            {isOrderPage && quantity && ( // Отображение количества, если это страница заказов
                                <span>Количество: {quantity}</span>
                            )}
                        </div>
                        {!isOrderPage && (
                            <img
                                className={styles.plus}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickPlus();
                                }}
                                src={
                                    isItemAdded
                                        ? "./img/btn-checked.svg"
                                        : "./img/btn-plus.svg"
                                }
                                alt="Plus"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;

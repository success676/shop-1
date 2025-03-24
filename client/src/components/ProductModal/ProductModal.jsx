import React from "react";

import config from "../../utils/config";

import styles from "./ProductModal.module.scss";

const getGenderInRussian = (gender) => {
    switch (gender) {
        case "male":
            return "Мужской";
        case "female":
            return "Женский";
        default:
            return "Неизвестно";
    }
};

const ProductModal = ({ product, onClose, onAddToCart, loading }) => {
    if (!product) return null;

    return (
        <div className={styles.root} onClick={onClose}>
            <div className={styles.modalContentMain} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <div className={styles.modalLeft}>
                    <img src={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`} alt={product.title} />
                </div>
                <div className={styles.modalRight}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Цена: {product.price} руб.</p>
                    <p>В наличии: {product.stock}</p>
                    <p>Категория: {product.category.name}</p>
                    <p>Пол: {getGenderInRussian(product.gender)}</p>
                    <button
                        className={styles.addCartBtn}
                        onClick={() => onAddToCart(product._id)}
                        disabled={loading}
                    >
                        {loading ? "Добавление..." : "Добавить в корзину"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;

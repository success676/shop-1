import React from "react";

import config from "../config";

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-main" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-left">
                    <img src={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`} alt={product.title} />
                </div>
                <div className="modal-right">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Цена: {product.price} руб.</p>
                    <p>В наличии: {product.stock}</p>
                    <p>Категория: {product.category.name}</p>
                    <p>Пол: {getGenderInRussian(product.gender)}</p>
                    <button
                        className="add-to-cart-button"
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

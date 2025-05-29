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

const ProductModal = ({ product, onClose, onAddToCart, loading, isInCart }) => {
    if (!product) return null;

    return (
        <div className={styles.root} onClick={onClose}>
            <div className={styles.modalContentMain} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <div className={styles.modalLeft}>
                    <img 
                        src={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`} 
                        alt={product.title} 
                        className={styles.productImage}
                    />
                </div>
                <div className={styles.modalRight}>
                    <div className={styles.productHeader}>
                        <h2>{product.title}</h2>
                        <p className={styles.productCategory}>{product.category.name}</p>
                    </div>
                    
                    <p className={styles.productDescription}>{product.description}</p>
                    
                    <div className={styles.productDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Цена:</span>
                            <span className={styles.detailValue}>{product.price} руб.</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>В наличии:</span>
                            <span className={styles.stockValue}>{product.stock} шт.</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Пол:</span>
                            <span className={styles.detailValue}>{getGenderInRussian(product.gender)}</span>
                        </div>
                    </div>
                    
                    <button
                        className={`${styles.addCartBtn} ${isInCart ? styles.removeFromCart : ''}`}
                        onClick={() => onAddToCart(product._id)}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className={styles.btnLoading}>
                                <span className={styles.spinner}></span>
                                {isInCart ? "Удаление..." : "Добавление..."}
                            </span>
                        ) : (
                            isInCart ? "Удалить из корзины" : "Добавить в корзину"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
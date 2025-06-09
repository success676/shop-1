import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchProducts,
    fetchCategories,
} from "../../../redux/features/admin/adminSlice";
import AdminCreateProduct from "../../../components/Admin/AdminCreateProduct/AdminCreateProduct";
import AdminEditProduct from "../../../components/Admin/AdminEditProduct/AdminEditProduct";
import config from "../../../utils/config";
import { FaPlus, FaEdit, FaSearch, FaTimes } from "react-icons/fa";
import styles from "./AdminProducts.module.scss";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products: allProducts, categories } = useSelector(
        (state) => state.admin
    );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const openCreateModal = () => {
        setSelectedProduct(null);
        setIsCreateModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
    };

    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" ||
            (product.category &&
                (product.category._id === selectedCategory ||
                    product.category === selectedCategory));
        return matchesSearch && matchesCategory;
    });

    const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminHeader}>
                <h1>Управление продуктами ({filteredProducts.length})</h1>
                <div className={styles.headerActions}>
                    <button
                        className={styles.filterToggle}
                        onClick={toggleFilters}
                    >
                        {isFiltersOpen ? "Скрыть фильтры" : "Показать фильтры"}
                    </button>
                    <button
                        className={styles.addProductButton}
                        onClick={openCreateModal}
                    >
                        <FaPlus /> Добавить продукт
                    </button>
                </div>
            </div>

            <div
                className={`${styles.filterPanel} ${
                    isFiltersOpen ? styles.active : ""
                }`}
            >
                <div className={styles.searchContainer}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className={styles.clearSearch}
                            onClick={() => setSearchTerm("")}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                <div className={styles.selectContainer}>
                    <select
                        className={styles.categorySelect}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Все категории</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {selectedCategory !== "all" && (
                        <button
                            className={styles.clearCategory}
                            onClick={() => setSelectedCategory("all")}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                {(searchTerm || selectedCategory !== "all") && (
                    <button
                        className={styles.clearFilters}
                        onClick={clearFilters}
                    >
                        Сбросить фильтры
                    </button>
                )}
            </div>

            <div className={styles.productGrid}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className={styles.productCard}
                            onClick={() => openEditModal(product)}
                        >
                            <div className={styles.productImageContainer}>
                                <img
                                    src={
                                        product.imageUrl
                                            ? `${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`
                                            : "/images/default-product.png"
                                    }
                                    alt={product.title}
                                    className={styles.productImage}
                                    onError={(e) => {
                                        e.target.src =
                                            "/images/default-product.png";
                                    }}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productTitle}>
                                    {product.title}
                                </h3>
                                {product.category && (
                                    <span className={styles.productCategory}>
                                        {typeof product.category === "object"
                                            ? product.category.name
                                            : categories.find(
                                                  (c) =>
                                                      c._id === product.category
                                              )?.name}
                                    </span>
                                )}
                                <button className={styles.editButton}>
                                    <FaEdit /> Редактировать
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>Ничего не найдено</p>
                        <button
                            className={styles.addProductButton}
                            onClick={openCreateModal}
                        >
                            <FaPlus /> Добавить новый продукт
                        </button>
                    </div>
                )}
            </div>

            {isEditModalOpen && selectedProduct && (
                <div className={styles.modalOverlay}>
                    <AdminEditProduct
                        product={selectedProduct}
                        onClose={closeModal}
                        categories={categories}
                    />
                </div>
            )}

            {isCreateModalOpen && (
                <div className={styles.modalOverlay}>
                    <AdminCreateProduct
                        onClose={closeModal}
                        categories={categories}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminProducts;

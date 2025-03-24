import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "../components/Card";
import { Sidebar } from "../components/Sidebar/Sidebar";
import ProductModal from "../components/ProductModal/ProductModal";

import { getAllProducts } from "../redux/features/product/productSlice";
import { getAllCategories } from "../redux/features/category/categorySlice";
import { addToCart, removeCartItem } from "../redux/features/cart/cartSlice";
import { selectUserId, getMe } from "../redux/features/auth/authSlice";
import {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
} from "../redux/features/favorites/favoritesSlice";

import config from "../utils/config";

function Main({ searchValue, setSearchValue, onChangeSearchInput }) {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { cart } = useSelector((state) => state.cart);
    const userId = useSelector(selectUserId);
    const { favorites } = useSelector((state) => state.favorites);
    const [loading, setLoading] = useState({});
    const [filters, setFilters] = useState({
        gender: "",
        category: "",
        subcategory: "",
    });
    const [currentFilters, setCurrentFilters] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для выбранного продукта

    const filterLabels = {
        gender: {
            "": "Все товары",
            male: "Мужская одежда",
            female: "Женская одежда",
        },
        category: {
            "": "Все категории",
            ...categories.reduce((acc, category) => {
                acc[category._id] = category.name;
                return acc;
            }, {}),
        },
    };

    useEffect(() => {
        dispatch(getAllProducts(filters));
        dispatch(getAllCategories());
        if (userId) {
            dispatch(getFavorites(userId));
        }
    }, [dispatch, userId, filters]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getMe());
        }
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleCloseModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        const updatedFilters = currentFilters.filter(
            (filter) => filter.name !== name
        );
        if (value) {
            updatedFilters.push({ name, value });
        }
        setCurrentFilters(updatedFilters);
    };

    const handleResetFilters = () => {
        setFilters({ gender: "", category: "", subcategory: "" });
        setCurrentFilters([]);
    };

    const handleAddToCart = async (productId) => {
        if (loading[productId]) return;

        setLoading((prev) => ({ ...prev, [productId]: true }));

        try {
            if (userId) {
                const isInCart = cart.some(
                    (item) => item.product._id === productId
                );
                if (isInCart) {
                    await dispatch(removeCartItem({ userId, productId }));
                } else {
                    await dispatch(addToCart({ userId, productId }));
                }
            } else {
                toast.error("Пользователь не авторизован");
            }
        } catch (error) {
            console.error("Ошибка обновления корзины:", error);
        } finally {
            setLoading((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const handleAddToFavorite = async (productId) => {
        if (loading[productId]) return;

        setLoading((prev) => ({ ...prev, [productId]: true }));

        try {
            if (userId) {
                const isInFavorites = favorites.some(
                    (item) => item._id === productId
                );
                if (isInFavorites) {
                    await dispatch(removeFromFavorites({ userId, productId }));
                } else {
                    await dispatch(addToFavorites({ userId, productId }));
                }
            } else {
                toast.error("Пользователь не авторизован");
            }
        } catch (error) {
            console.error("Ошибка обновления избранного:", error);
        } finally {
            setLoading((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const renderItems = () => {
        const filtredItems = products.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return filtredItems.map(
            (product) =>
                product && (
                    <Card
                        product={product}
                        key={product._id}
                        id={product._id}
                        title={product.title}
                        price={product.price}
                        imageUrl={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`}
                        onFavorite={() => handleAddToFavorite(product._id)}
                        onPlus={() => handleAddToCart(product._id)}
                        onClick={() => handleOpenModal(product)} // Обработчик для открытия модального окна
                        isItemAdded={cart.some(
                            (item) => item.product._id === product._id
                        )}
                        isItemFavorited={
                            Array.isArray(favorites) &&
                            favorites.some((item) => item._id === product._id)
                        }
                        loading={loading[product._id]}
                    />
                )
        );
    };

    const getFilterText = () => {
        if (currentFilters.length === 0) {
            return "Все товары";
        }
        return currentFilters
            .map((filter) => filterLabels[filter.name][filter.value])
            .join(" > ");
    };

    return (
        <div className="content p-40 all-pages main-page">
            <Sidebar
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
            />
            <div className="d-flex align-center justify-between mb-40 test">
                <h1>
                    {searchValue
                        ? `Поиск по запросу "${searchValue}"`
                        : getFilterText()}
                </h1>
                <div className="search-block d-flex">
                    <img src="./img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue("")}
                            className="clear cu-p"
                            src="./img/btn-remove.svg"
                            alt="Clear"
                        />
                    )}
                    <input
                        onChange={onChangeSearchInput}
                        value={searchValue}
                        placeholder="Поиск..."
                    />
                </div>
            </div>

            <div className="d-flex flex-wrap card-render">{renderItems()}</div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                    loading={loading[selectedProduct._id]}
                />
            )}
        </div>
    );
}

export default Main;

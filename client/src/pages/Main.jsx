import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Card from "../components/Card";
import { Sidebar } from "../components/Sidebar/Sidebar";

import { getAllProducts } from "../redux/features/product/productSlice";
import { addToCart, removeCartItem } from "../redux/features/cart/cartSlice";
import { selectUserId, getMe } from "../redux/features/auth/authSlice";
import {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
} from "../redux/features/favorites/favoritesSlice";

function Main({ searchValue, setSearchValue, onChangeSearchInput }) {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
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

    const filterLabels = {
        gender: {
            "": "Все товары",
            male: "Мужская одежда",
            female: "Женская одежда",
        },
        category: {
            "": "Все категории",
            "t-shirts": "Футболки",
            shorts: "Шорты",
            // pants: "Брюки",
            shoes: "Обувь",
            underwear: "Нижнее белье",
        },
        // subcategory: {
        //     "": "Все подкатегории",
        //     "male": "Тест1",
        //     "female": "Тест2"
        // }
    };

    useEffect(() => {
        dispatch(getAllProducts(filters));
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
                        imageUrl={product.imageUrl}
                        onFavorite={() => handleAddToFavorite(product._id)}
                        onPlus={() => handleAddToCart(product._id)}
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
        </div>
    );
}

export default Main;

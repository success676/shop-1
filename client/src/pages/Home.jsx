// src/pages/Home.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Card from "../components/Card";

import { getAllProducts } from "../redux/features/product/productSlice";
import { addToCart, removeCartItem } from "../redux/features/cart/cartSlice";
import { selectUserId } from "../redux/features/auth/authSlice";
import { addToFavorites, removeFromFavorites, getFavorites } from "../redux/features/favorites/favoritesSlice";

function Home({
    searchValue,
    setSearchValue,
    onChangeSearchInput,
}) {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { cart } = useSelector((state) => state.cart);
    const userId = useSelector(selectUserId);
    const { favorites } = useSelector((state) => state.favorites);

    useEffect(() => {
        dispatch(getAllProducts());
        if (userId) {
            dispatch(getFavorites(userId));
        }
    }, [dispatch, userId]);

    const handleAddToCart = (productId) => {
        if (userId) {
            const isInCart = cart.some(
                (item) => item.product._id === productId
            );
            if (isInCart) {
                dispatch(removeCartItem({ userId, productId }));
            } else {
                dispatch(addToCart({ userId, productId }));
            }
        } else {
            toast.error("Пользователь не авторизован");
        }
    };

    const handleAddToFavorite = (productId) => {
        if (userId) {
            const isInFavorites = favorites.some(
                (item) => item._id === productId
            );
            if (isInFavorites) {
                dispatch(removeFromFavorites({ userId, productId }));
            } else {
                dispatch(addToFavorites({ userId, productId }));
            }
        } else {
            toast.error("Пользователь не авторизован");
        }
    };

    const renderItems = () => {
        const filtredItems = products.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return filtredItems.map((product) => (
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
                isItemFavorited={Array.isArray(favorites) && favorites.some(
                    (item) => item._id === product._id
                )}
            />
        ));
    };

    return (
        <div className="content p-40 all-pages home-page">
            <div className="d-flex align-center justify-between mb-40 test">
                <h1>
                    {searchValue
                        ? `Поиск по запросу "${searchValue}"`
                        : "Все товары"}
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

export default Home;

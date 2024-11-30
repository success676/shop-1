import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import {
    getFavorites,
    removeFromFavorites,
} from "../redux/features/favorites/favoritesSlice";
import { selectUserId } from "../redux/features/auth/authSlice";
import { addToCart, removeCartItem } from "../redux/features/cart/cartSlice";
import NoItems from "../components/NoItems";
import { toast } from "react-toastify";

function Favorites() {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const { favorites } = useSelector((state) => state.favorites);
    const { cart } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState({});

    useEffect(() => {
        if (userId) {
            dispatch(getFavorites(userId));
        }
    }, [dispatch, userId]);

    const handleAddToCart = async (productId) => {
        if (loading[productId]) return;

        setLoading((prev) => ({ ...prev, [productId]: true }));

        try {
            if (userId) {
                const isInCart = cart.some((item) => item.product._id === productId);
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

    return (
        <div className="content p-40 all-pages favorites-page">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>

            <div className={favorites.length > 0 ? "d-flex flex-wrap" : ""}>
                {favorites.length > 0 ? (
                    Array.isArray(favorites) &&
                    favorites.map((item) => (
                        <Card
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            isItemFavorited={true}
                            onFavorite={() =>
                                dispatch(
                                    removeFromFavorites({
                                        userId,
                                        productId: item._id,
                                    })
                                )
                            }
                            onPlus={() => handleAddToCart(item._id)}
                            isItemAdded={cart.some(
                                (cartItem) => cartItem.product._id === item._id
                            )}
                            loading={loading[item._id]}
                        />
                    ))
                ) : (
                    <NoItems
                        title="Закладок нет("
                        description="Вы еще ничего не добавили в избранное."
                        buttonText="На шопинг!"
                        imageUrl="./img/sad-face2.png"
                    />
                )}
            </div>
        </div>
    );
}

export default Favorites;

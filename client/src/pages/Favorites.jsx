import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import {
    getFavorites,
    removeFromFavorites,
} from "../redux/features/favorites/favoritesSlice";
import { selectUserId } from "../redux/features/auth/authSlice";
import { addToCart } from "../redux/features/cart/cartSlice";

function Favorites() {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const { favorites } = useSelector((state) => state.favorites);
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        if (userId) {
            dispatch(getFavorites(userId));
        }
    }, [dispatch, userId]);

    return (
        <div className="content p-40 all-pages favorites-page">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
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
                            onPlus={() =>
                                dispatch(
                                    addToCart({ userId, productId: item._id })
                                )
                            }
                            isItemAdded={cart.some(
                                (cartItem) => cartItem.product._id === item._id
                            )}
                        />
                    ))
                ) : (
                    <div>Вы еще ничего не добавили в избранное</div>
                )}
            </div>
        </div>
    );
}

export default Favorites;

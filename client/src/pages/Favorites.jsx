import React from "react";

import Card from "../components/Card";
import AppContext from "../context";

function Favorites() {
    const { favorites, onAddToFavorite, onAddToCart } = React.useContext(AppContext);

    return (
        <div className="content p-40 all-pages favorites-page">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        favorited={true}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;

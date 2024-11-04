// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Profile from "./pages/Profile.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [cartOpened, setCartOpened] = React.useState(false);

    const onAddToFavorite = async (obj) => {
        try {
            const findFavorite = favorites.find(
                (item) => Number(item.parentId) === Number(obj.id)
            );
            if (findFavorite) {
                setFavorites((prev) =>
                    prev.filter(
                        (item) => Number(item.parentId) !== Number(obj.id)
                    )
                );
                await axios.delete(
                    `https://660bf45c3a0766e85dbd0524.mockapi.io/favorites/${findFavorite.id}`
                );
            } else {
                setFavorites((prev) => [...prev, obj]);
                const { data } = await axios.post(
                    "https://660bf45c3a0766e85dbd0524.mockapi.io/favorites",
                    obj
                );
                setFavorites((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (error) {
            alert("Не удалось добавить в закладки");
            console.error(error);
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemFavorited = (id) => {
        return favorites.some((obj) => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                cartItems,
                favorites,
                onAddToFavorite,
                setCartOpened,
                setCartItems,
                isItemFavorited,
            }}
        >
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    opened={cartOpened}
                />

                <Layout>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    onChangeSearchInput={onChangeSearchInput}
                                    onAddToFavorite={onAddToFavorite}
                                />
                            }
                        />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>

                    <ToastContainer position="bottom-right" />
                </Layout>
            </div>
        </AppContext.Provider>
    );
}

export default App;

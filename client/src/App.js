import React from "react";
import { Routes, Route } from "react-router-dom";
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

    const [searchValue, setSearchValue] = React.useState("");
    const [cartOpened, setCartOpened] = React.useState(false);

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <AppContext.Provider
            value={{
                setCartOpened,
            }}
        >
            <div className="wrapper clear">
                <Drawer
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

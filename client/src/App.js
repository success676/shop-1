import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HomeLayout } from "./components/Layouts/HomeLayout.jsx";
import { MainLayout } from "./components/Layouts/MainLayout.jsx";

import Main from "./pages/Main.jsx";
import {Home} from "./pages/Home.jsx";
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

                <Routes>
                    <Route
                        path="/home"
                        element={
                            <HomeLayout>
                                <Home />
                            </HomeLayout>
                        }
                    />
                    <Route
                        path="/main"
                        element={
                            <MainLayout>
                                <Main
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                    onChangeSearchInput={onChangeSearchInput}
                                />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <MainLayout>
                                <Favorites />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <MainLayout>
                                <Orders />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <MainLayout>
                                <LoginPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <MainLayout>
                                <RegisterPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <MainLayout>
                                <Profile />
                            </MainLayout>
                        }
                    />

                    {/* Перенаправление с корневого пути на /home */}
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
                <ToastContainer position="bottom-right" />
            </div>
        </AppContext.Provider>
    );
}

export default App;

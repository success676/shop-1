import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./redux/features/auth/authSlice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop.js";

import { HomeLayout } from "./components/Layouts/HomeLayout.jsx";
import { MainLayout } from "./components/Layouts/MainLayout.jsx";
import { AdminLayout } from "./components/Layouts/AdminLayout.jsx";

import Main from "./pages/Main.jsx";
import { Home } from "./pages/Home.jsx";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Users from "./pages/Admin/AdminUsers.jsx";
import Products from "./pages/Admin/AdminProducts.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";
import Checkout from "./pages/Checkout.jsx";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    const { user } = useSelector((state) => state.auth);

    const isAdmin = user && user.role === "admin";

    const [searchValue, setSearchValue] = useState("");
    const [cartOpened, setCartOpened] = useState(false);

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
                <ScrollToTop />
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
                            <HomeLayout>
                                <Favorites />
                            </HomeLayout>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <HomeLayout>
                                <Orders />
                            </HomeLayout>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <HomeLayout>
                                <LoginPage />
                            </HomeLayout>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <HomeLayout>
                                <RegisterPage />
                            </HomeLayout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <HomeLayout>
                                <Profile />
                            </HomeLayout>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            isAdmin ? (
                                <AdminLayout>
                                    <AdminDashboard />
                                </AdminLayout>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            isAdmin ? (
                                <AdminLayout>
                                    <Users />
                                </AdminLayout>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={
                            isAdmin ? (
                                <AdminLayout>
                                    <Products />
                                </AdminLayout>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/admin/orders"
                        element={
                            isAdmin ? (
                                <AdminLayout>
                                    <AdminOrders />
                                </AdminLayout>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <HomeLayout>
                                <Checkout />
                            </HomeLayout>
                        }
                    />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
                <ToastContainer position="bottom-right" />
            </div>
        </AppContext.Provider>
    );
}

export default App;

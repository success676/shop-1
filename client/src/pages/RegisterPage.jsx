import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) {
            toast(status);
        }
        if (isAuth) navigate("/");
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        if (!username || !password) {
            toast.error("Пожалуйста, введите имя пользователя и пароль.");
            return;
        }

        try {
            dispatch(registerUser({ username, password }));
            setPassword("");
            setUsername("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="all-pages login-page">
            <form onSubmit={(e) => e.preventDefault()} className="form">
                <h2>Регистрация:</h2>
                <span className="input-span">
                    <label className="label">Логин:</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="email"
                        id="email"
                    />
                </span>
                <span className="input-span">
                    <label className="label">Пароль:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="password"
                    />
                </span>
                <span className="span"></span>
                <input
                    onClick={handleSubmit}
                    className="submit"
                    type="submit"
                    value="Создать аккаунт"
                />
                <span className="span">
                    Уже есть аккаунт? <Link to={"/login"}>Авторизация</Link>
                </span>
            </form>
        </div>
    );
};

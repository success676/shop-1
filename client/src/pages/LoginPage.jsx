import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { status } = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status) toast(status);
        if (isAuth) navigate("/");
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }));
        } catch (error) {
            console.log(error);
        }
    };

    // ВОЗМОЖНЫЙ ФИКС ТОСТИФАЯ test fix (не забыть повешать функцию на линк и clearError в импорты)
    // const goRegisterPage = () => {
    //     try {
    //         dispatch(clearError());
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div className="all-pages login-page">
            <form onSubmit={(e) => e.preventDefault()} className="form">
                <h2>Авторизация:</h2>
                <span className="input-span">
                    <label className="label">
                    Username:
                    </label>
                    <input value={username}
                    onChange={(e) => setUsername(e.target.value)} type="text" name="email" id="email" />
                </span>
                <span className="input-span">
                    <label className="label">
                    Password:
                    </label>
                    <input value={password}
                    onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                </span>
                <span className="span">
                </span>
                <input onClick={handleSubmit} className="submit" type="submit" value="Войти" />
                <span className="span">
                    Нет учетной записи? <Link to={'/register'}>Регистрация</Link>
                </span>
            </form>
        </div>
    );
};

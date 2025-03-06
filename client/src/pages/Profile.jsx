import React from "react";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";

const Profile = () => {
    const isAuth = useSelector(checkIsAuth);
    const { user } = useSelector((state) => state.auth);

    if (!isAuth) {
        return (
            <div className="content p-40 all-pages">
                <h1 className="">
                    Чтобы зайти в профиль вам нужно авторизоваться.
                </h1>
            </div>
        );
    }

    return (
        <div className="content p-40 all-pages">
            <h1 className="mb-30">Привет {user.username}! Это ваш личный кабинет.</h1>
            <EditProfileForm />
        </div>
    );
};

export default Profile;

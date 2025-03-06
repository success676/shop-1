import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchUsers,
    updateUserRole,
} from "../../redux/features/admin/adminSlice";
import config from "../../config";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUserRole({ id: userId, role: newRole }));
    };

    return (
        <div className="content p-40 all-pages">
            <div className="admin-dashboard">
                <h1 className="mb-20">Пользователи</h1>
                <ul>
                    {Array.isArray(users) &&
                        users.map((user) => (
                            <li key={user._id} className="user-item">
                                <div className="d-flex align-center">
                                    {user.profilePhoto && (
                                        <img
                                            src={`${config.apiUrl}/${config.imgProfile}/${user.profilePhoto}`}
                                            alt="Profile"
                                            className="adminUserProfilePhoto"
                                        />
                                    )}
                                    Логин: {user.username} - Роль: {user.role}
                                </div>
                                <div className="toggler">
                                    <input
                                        id={`toggler-${user._id}`}
                                        name={`toggler-${user._id}`}
                                        type="checkbox"
                                        checked={user.role === "admin"}
                                        onChange={() =>
                                            handleRoleChange(
                                                user._id,
                                                user.role === "admin"
                                                    ? "user"
                                                    : "admin"
                                            )
                                        }
                                    />
                                    <label htmlFor={`toggler-${user._id}`}>
                                        <svg
                                            className="toggler-on"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 130.2 130.2"
                                        >
                                            <polyline
                                                className="path check"
                                                points="100.2,40.2 51.5,88.8 29.8,67.5"
                                            ></polyline>
                                        </svg>
                                        <svg
                                            className="toggler-off"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 130.2 130.2"
                                        >
                                            <line
                                                className="path line"
                                                x1="34.4"
                                                y1="34.4"
                                                x2="95.8"
                                                y2="95.8"
                                            ></line>
                                            <line
                                                className="path line"
                                                x1="95.8"
                                                y1="34.4"
                                                x2="34.4"
                                                y2="95.8"
                                            ></line>
                                        </svg>
                                    </label>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminUsers;

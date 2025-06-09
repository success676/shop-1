import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchUsers,
    updateUserRole,
} from "../../../redux/features/admin/adminSlice";
import config from "../../../utils/config";
import { toast } from "react-toastify";

import styles from "./AdminUsers.module.scss";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.admin);
    const currentUser = useSelector((state) => state.auth.user); // Получаем текущего пользователя

    React.useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleRoleChange = (userId, newRole, username) => {
        // Запрещаем снимать админку с пользователя с именем "admin"
        if (username === "admin" && newRole === "user") {
            toast("Нельзя разжаловать главного администратора!");
            return;
        }

        // Дополнительно: запрещаем другим админам снимать админку с текущего пользователя
        if (userId === currentUser?._id && newRole === "user") {
            toast("Вы не можете удалить себя из администраторов!");
            return;
        }

        dispatch(updateUserRole({ id: userId, role: newRole }));
    };

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>Ошибка: {error}</div>;

    if (!Array.isArray(users)) {
        return (
            <div className="content p-40 all-pages">
                <div className={styles.noData}>Нет доступных данных</div>
            </div>
        );
    }

    return (
        <div className="content p-40 all-pages">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Управление пользователями</h1>
                    <p className={styles.subtitle}>
                        Всего пользователей: {users?.length || 0}
                    </p>
                </div>

                <div className={styles.usersList}>
                    {Array.isArray(users) &&
                        users.map((user) => (
                            <div key={user._id} className={styles.userCard}>
                                <div className={styles.userInfo}>
                                    <div className={styles.avatarContainer}>
                                        {user.profilePhoto ? (
                                            <img
                                                src={`${config.apiUrl}/${config.imgProfile}/${user.profilePhoto}`}
                                                alt="Аватар"
                                                className={styles.avatar}
                                            />
                                        ) : (
                                            <div
                                                className={
                                                    styles.avatarPlaceholder
                                                }
                                            >
                                                {user.username
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.userDetails}>
                                        <h3 className={styles.username}>
                                            {user.username}
                                        </h3>
                                        <p className={styles.email}>
                                            {user.email}
                                        </p>
                                        <span
                                            className={`${styles.roleBadge} ${
                                                user.role === "admin"
                                                    ? styles.admin
                                                    : styles.user
                                            }`}
                                        >
                                            {user.role === "admin"
                                                ? "Администратор"
                                                : "Пользователь"}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.roleToggle}>
                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={user.role === "admin"}
                                            onChange={() =>
                                                handleRoleChange(
                                                    user._id,
                                                    user.role === "admin"
                                                        ? "user"
                                                        : "admin",
                                                    user.username // Передаем username в обработчик
                                                )
                                            }
                                            // Отключаем переключатель для пользователя "admin"
                                            // disabled={user.username === "admin" && user.role === "admin"}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                    <span className={styles.toggleLabel}>
                                        {user.role === "admin"
                                            ? "Админ"
                                            : "Пользователь"}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;

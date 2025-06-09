import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPurchases } from "../../redux/features/admin/adminSlice";
import Analytics from "../../components/Admin/AdminAnalytics/AdminAnalytics";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { purchases } = useSelector((state) => state.admin);
    const { user } = useSelector((state) => state.auth);

    const isAdmin = user && user.role === "admin";

    useEffect(() => {
        dispatch(fetchPurchases());
    }, [dispatch]);

    if (!isAdmin) {
        return (
            <div className="content p-40 all-pages">
                <h1>Данный функционал доступен только администраторам.</h1>
            </div>
        );
    }

    return (
        <div className="content p-40 all-pages">
            <Analytics purchases={purchases} />
        </div>
    );
};

export default AdminDashboard;

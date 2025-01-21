import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCategories } from "../../redux/features/admin/adminSlice";
import AdminCreateProduct from "../../components/AdminCreateProduct";
import AdminEditProduct from "../../components/AdminEditProduct";

import config from '../../config';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products, categories } = useSelector((state) => state.admin);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        const handleClickOutside = (event) => {
            if (event.target.classList.contains("modal")) {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const openCreateModal = () => {
        setSelectedProduct(null);
        setIsCreateModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="content p-40 all-pages">
            <div className="admin-dashboard">
                <div className="d-flex align-center justify-between mb-20">
                    <h1>Продукты</h1>
                    <button className="admin-dashboard-product" onClick={openCreateModal}>Добавить продукт</button>
                </div>
                <ul>
                    {Array.isArray(products) &&
                        products.map((product) => (
                            <li className="cu-p" key={product._id} onClick={() => openEditModal(product)}>
                                {product.imageUrl ? (
                                    <img src={`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`} alt={product.title} />
                                ) : (
                                    <img src="path/to/default/image.jpg" alt={product.title} />
                                )}
                                {product.title}
                            </li>
                        ))}
                </ul>
            </div>
            {isEditModalOpen && selectedProduct && (
                <AdminEditProduct
                    product={selectedProduct}
                    onClose={closeModal}
                    categories={categories}
                />
            )}
            {isCreateModalOpen && (
                <AdminCreateProduct
                    onClose={closeModal}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default AdminProducts;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct, deleteProduct } from "../redux/features/admin/adminSlice";

import config from '../config';

const AdminEditProduct = ({ product, onClose, categories }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        gender: "",
        category: "",
        description: "",
        stock: ""
    });
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (product) {
            setFormData(product);
            if (product.imageUrl) {
                setImageUrl(`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`);
                
            }
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("price", formData.price);
        data.append("gender", formData.gender);
        data.append("category", formData.category);
        data.append("description", formData.description);
        data.append("stock", formData.stock);
        if (image) {
            data.append("image", image);
        }

        dispatch(updateProduct({ id: product._id, product: data }));
        onClose();
    };

    const handleDelete = () => {
        dispatch(deleteProduct(product._id));
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content-admin">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Редактирование продукта</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Цена</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Фото</label>
                        <input type="file" name="image" onChange={handleImageChange} />
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
                    <div className="form-group">
                        <label>Пол</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Выберите пол</option>
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Категория</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Выберите категорию</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Наличие на складе</label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>
                    <div className="form-buttons">
                        <button className="form-buttons-green" type="submit">Обновить</button>
                        <button className="form-buttons-red" type="button" onClick={handleDelete}>Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProduct;

import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateProduct, deleteProduct } from "../../../redux/features/admin/adminSlice";
import config from '../../../utils/config';
import { FaTimes } from 'react-icons/fa';
import styles from './AdminEditProduct.module.scss';

const AdminEditProduct = ({ product, onClose, categories }) => {
    const dispatch = useDispatch();
    const modalRef = useRef();
    const [formData, setFormData] = React.useState({
        title: "",
        price: "",
        gender: "",
        category: "",
        description: "",
        stock: ""
    });
    const [image, setImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState("");

    useEffect(() => {
        if (product) {
            setFormData(product);
            if (product.imageUrl) {
                setImageUrl(`${config.apiUrl}/${config.imgGoods}/${product.imageUrl}`);
            }
        }
    }, [product]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

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
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            dispatch(deleteProduct(product._id));
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
                <button className={styles.closeButton} onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 className={styles.modalTitle}>Редактирование продукта</h2>
                <form onSubmit={handleSubmit} className={styles.productForm}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Название</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                className={styles.formInput}
                                required 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Цена</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                className={styles.formInput}
                                required 
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Фото</label>
                        <div className={styles.fileInputContainer}>
                            <input 
                                type="file" 
                                name="image" 
                                onChange={handleImageChange} 
                                className={styles.fileInput}
                                accept="image/*"
                            />
                            <span className={styles.fileInputLabel}>
                                {image ? 'Файл выбран' : 'Выберите файл'}
                            </span>
                        </div>
                    </div>

                    {imageUrl && (
                        <div className={styles.imagePreviewContainer}>
                            <img src={imageUrl} alt="Preview" className={styles.imagePreview} />
                        </div>
                    )}

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Пол</label>
                            <select 
                                name="gender" 
                                value={formData.gender} 
                                onChange={handleChange} 
                                className={styles.formSelect}
                                required
                            >
                                <option value="">Выберите пол</option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Категория</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleChange} 
                                className={styles.formSelect}
                                required
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Описание</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className={styles.formTextarea}
                            rows="4"
                            required 
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Наличие на складе</label>
                        <input 
                            type="number" 
                            name="stock" 
                            value={formData.stock} 
                            onChange={handleChange} 
                            className={styles.formInput}
                            required 
                        />
                    </div>

                    <div className={styles.formButtons}>
                        <button type="button" className={styles.deleteButton} onClick={handleDelete}>
                            Удалить
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Обновить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditProduct;
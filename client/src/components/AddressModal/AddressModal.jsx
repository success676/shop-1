import React, { useEffect, useState } from "react";
import styles from "./AddressModal.module.scss";

const AddressModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
    const [address, setAddress] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value,
        });

        // Clear error if the field is updated
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSave = () => {
        let valid = true;
        const newErrors = {};

        // Validate required fields
        if (!address.state) {
            newErrors.state = "Страна обязательна для заполнения";
            valid = false;
        }
        if (!address.city) {
            newErrors.city = "Город обязателен для заполнения";
            valid = false;
        }
        if (!address.street) {
            newErrors.street = "Улица обязательна для заполнения";
            valid = false;
        }
        if (!address.zip) {
            newErrors.zip = "Номер дома обязателен для заполнения";
            valid = false;
        }

        if (valid) {
            onSave(address);
            // Reset address state after saving
            setAddress({ state: "", city: "", street: "", zip: "" });
            setErrors({});
            onClose();
        } else {
            setErrors(newErrors);
        }
    };

    const handleClose = (e) => {
        if (e.target.classList.contains(styles.modalOverlay)) {
            onClose();
        }
    };

    const handleEscape = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        } else {
            document.removeEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2>Добавить новый адрес</h2>
                <div className={styles.formGroup}>
                    <label>Страна</label>
                    <input
                        type="text"
                        name="state"
                        value={address.state || ""}
                        onChange={handleChange}
                        required
                    />
                    {errors.state && <p className={styles.error}>{errors.state}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Город</label>
                    <input
                        type="text"
                        name="city"
                        value={address.city || ""}
                        onChange={handleChange}
                        required
                    />
                    {errors.city && <p className={styles.error}>{errors.city}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Улица</label>
                    <input
                        type="text"
                        name="street"
                        value={address.street || ""}
                        onChange={handleChange}
                        required
                    />
                    {errors.street && <p className={styles.error}>{errors.street}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label>Номер дома</label>
                    <input
                        type="text"
                        name="zip"
                        value={address.zip || ""}
                        onChange={handleChange}
                        required
                    />
                    {errors.zip && <p className={styles.error}>{errors.zip}</p>}
                </div>
                <div className={styles.modalActions}>
                    <button className={styles.btnSave} onClick={handleSave}>
                        Добавить
                    </button>
                    <button className={styles.btnCancel} onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;

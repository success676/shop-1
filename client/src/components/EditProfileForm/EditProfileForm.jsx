import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    addAddress,
    removeAddress,
    updateAddress,
} from "../../redux/features/address/addressSlice";
import { updateUser } from "../../redux/features/auth/authSlice";
import {
    uploadProfilePhoto,
    deleteProfilePhoto,
} from "../../redux/features/profile/profileSlice";

import AddressModal from "../AddressModal/AddressModal";

import config from "../../utils/config";

import { FaUpload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./EditProfileForm.module.scss";

const EditProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const fileInputRef = React.useRef(null);

    const [formData, setFormData] = React.useState({
        fullName: user?.contactInfo?.fullName || "",
        email: user?.contactInfo?.email || "",
        phone: user?.contactInfo?.phone || "",
        addresses: user?.contactInfo?.addresses || [],
        profilePhoto: user?.profilePhoto || "",
    });
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState("");

    React.useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.contactInfo?.fullName || "",
                email: user.contactInfo?.email || "",
                phone: user.contactInfo?.phone || "",
                addresses: user.contactInfo?.addresses || [],
                profilePhoto: user.profilePhoto || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (index, e) => {
        const { name, value } = e.target;
        const newAddresses = [...formData.addresses];
        newAddresses[index] = {
            ...newAddresses[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            addresses: newAddresses,
        });
    };

    const openModalHandler = () => {
        if (formData.addresses.length >= 5) {
            toast.error("Вы не можете добавить больше 5 адресов.");
        } else {
            setIsModalOpen(true);
        }
    };

    const closeModalHandler = () => {
        setIsModalOpen(false);
    };

    const saveNewAddressHandler = (address) => {
        dispatch(addAddress({ userId: user._id, address })).then((result) => {
            if (result.payload) {
                setFormData({
                    ...formData,
                    addresses: result.payload.contactInfo.addresses,
                });
            }
        });
    };

    const saveAddressHandler = (index) => {
        const address = formData.addresses[index];
        if (address._id) {
            dispatch(
                updateAddress({
                    userId: user._id,
                    addressId: address._id,
                    address,
                })
            ).then((result) => {
                if (result.payload) {
                    setFormData({
                        ...formData,
                        addresses: result.payload.contactInfo.addresses,
                    });
                }
            });
        } else {
            dispatch(addAddress({ userId: user._id, address })).then(
                (result) => {
                    if (result.payload) {
                        setFormData({
                            ...formData,
                            addresses: result.payload.contactInfo.addresses,
                        });
                    }
                }
            );
        }
    };

    const removeAddressHandler = (index) => {
        const addressId = formData.addresses[index]._id;
        dispatch(removeAddress({ userId: user._id, addressId })).then(
            (result) => {
                if (result.payload) {
                    setFormData({
                        ...formData,
                        addresses: result.payload.contactInfo.addresses,
                    });
                }
            }
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const resultAction = await dispatch(
                uploadProfilePhoto({ userId: user._id, formData })
            );
            if (uploadProfilePhoto.fulfilled.match(resultAction)) {
                toast.success("Фото профиля успешно загружено.");
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    profilePhoto: resultAction.payload.user.profilePhoto,
                }));
                setImageUrl("");
                setSelectedFile(null);

                // Сброс значения input type="file"
                fileInputRef.current.value = "";
            } else {
                toast.error("Ошибка при загрузке фото профиля.");
            }
        } catch (error) {
            toast.error("Ошибка при загрузке фото профиля.");
        }
    };

    const handleDelete = async () => {
        try {
            const resultAction = await dispatch(deleteProfilePhoto(user._id));
            if (deleteProfilePhoto.fulfilled.match(resultAction)) {
                toast.success("Фото профиля успешно удалено.");
                setFormData({
                    ...formData,
                    profilePhoto: "",
                });
            } else {
                toast.error("Ошибка при удалении фото профиля.");
            }
        } catch (error) {
            toast.error("Ошибка при удалении фото профиля.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ userId: user._id, contactInfo: formData })).then(
            (result) => {
                if (result.payload) {
                    toast.success("Профиль успешно сохранен.");
                } else {
                    toast.error("Ошибка при сохранении профиля.");
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit} className={styles.root}>
            <div className={styles.row}>
                <div className={styles.contactDetails}>
                    <p>Фото профиля</p>
                    <div className={styles.profilePhotoContainer}>
                        {!formData.profilePhoto && (
                            <div
                                className={styles.customFileInput}
                                onClick={handleCustomButtonClick}
                            >
                                <FaUpload />
                                <span>Выберите файл</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        {formData.profilePhoto && (
                            <img
                                src={`${config.apiUrl}/${config.imgProfile}/${formData.profilePhoto}`}
                                alt="Profile"
                                className={styles.profileImage}
                            />
                        )}
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className={styles.profileImage}
                            />
                        )}
                        <div className={styles.photoButtons}>
                            {selectedFile && (
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className={`${styles.uploadBtn} ${styles.iconButton}`}
                                >
                                    <FaUpload />
                                </button>
                            )}
                            {formData.profilePhoto && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className={`${styles.deleteBtn} ${styles.iconButton}`}
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    </div>
                    <p>Контактные данные</p>
                    <div className={styles.formGroup}>
                        <label>ФИО</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Электронная почта</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Номер телефона</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="profile-form-right">
                    <div className={styles.addressTitle}>
                        <p>Список ваших адресов</p>
                        <button
                            className={styles.btnAdd}
                            type="button"
                            onClick={openModalHandler}
                        >
                            <span>+</span>
                        </button>
                    </div>

                    <div className={styles.addressContainer}>
                        {formData.addresses &&
                            formData.addresses.map((address, index) => (
                                <div key={index} className={styles.addressItem}>
                                    <h4>Адрес {index + 1}</h4>
                                    <div className="form-group">
                                        <label>Страна</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={address.state}
                                            onChange={(e) =>
                                                handleAddressChange(index, e)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Город</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={address.city}
                                            onChange={(e) =>
                                                handleAddressChange(index, e)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Улица</label>
                                        <input
                                            type="text"
                                            name="street"
                                            value={address.street}
                                            onChange={(e) =>
                                                handleAddressChange(index, e)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Номер дома</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            value={address.zip}
                                            onChange={(e) =>
                                                handleAddressChange(index, e)
                                            }
                                        />
                                    </div>
                                    <div className={styles.btnsRow}>
                                        <button
                                            className={styles.btnSave}
                                            type="button"
                                            onClick={() =>
                                                saveAddressHandler(index)
                                            }
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            className={styles.btnRemove}
                                            type="button"
                                            onClick={() =>
                                                removeAddressHandler(index)
                                            }
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className={styles.btn}>
                <button className="greenButton" type="submit">
                    Сохранить профиль
                </button>
            </div>
            <AddressModal
                isOpen={isModalOpen}
                onClose={closeModalHandler}
                onSave={saveNewAddressHandler}
            />
        </form>
    );
};

export default EditProfileForm;

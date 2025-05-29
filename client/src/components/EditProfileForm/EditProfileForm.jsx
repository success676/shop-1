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
import {
    FaUpload,
    FaTrash,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";
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
                toast.success("Адрес успешно добавлен");
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
                    toast.success("Адрес успешно обновлен");
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
                        toast.success("Адрес успешно добавлен");
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
                    toast.success("Адрес успешно удален");
                }
            }
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Файл слишком большой (максимум 2MB)");
                return;
            }
            if (!file.type.match("image.*")) {
                toast.error("Пожалуйста, выберите изображение");
                return;
            }
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
            <h2 className={styles.title}>Редактирование профиля</h2>

            <div className={styles.row}>
                <div className={styles.contactDetails}>
                    <div className={styles.profilePhotoContainer}>
                        <h3 className={styles.sectionTitle}>
                            <FaUser className={styles.icon} /> Фото профиля
                        </h3>
                        <div className={styles.photoWrapper}>
                            {!formData.profilePhoto && !imageUrl && (
                                <div className={styles.placeholder}>
                                    <FaUser
                                        className={styles.placeholderIcon}
                                    />
                                </div>
                            )}
                            {(formData.profilePhoto || imageUrl) && (
                                <img
                                    src={
                                        imageUrl ||
                                        `${config.apiUrl}/${config.imgProfile}/${formData.profilePhoto}`
                                    }
                                    alt="Profile"
                                    className={styles.profileImage}
                                />
                            )}
                            <div className={styles.photoControls}>
                                {!formData.profilePhoto && (
                                    <div
                                        className={styles.uploadButton}
                                        onClick={handleCustomButtonClick}
                                    >
                                        <FaUpload
                                            className={styles.uploadIcon}
                                        />
                                        <span>Загрузить</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                                {selectedFile && (
                                    <button
                                        type="button"
                                        onClick={handleUpload}
                                        className={styles.actionButton}
                                    >
                                        Сохранить фото
                                    </button>
                                )}
                                {formData.profilePhoto && !selectedFile && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                    >
                                        <FaTrash /> Удалить
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.contactForm}>
                        <h3 className={styles.sectionTitle}>
                            <FaUser className={styles.icon} /> Контактные данные
                        </h3>
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>
                                <span>ФИО</span>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Введите ваше полное имя"
                                    />
                                </div>
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>
                                <span>
                                    <FaEnvelope className={styles.inputIcon} />{" "}
                                    Электронная почта
                                </span>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@mail.com"
                                    />
                                </div>
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>
                                <span>
                                    <FaPhone className={styles.inputIcon} />{" "}
                                    Номер телефона
                                </span>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+7 (XXX) XXX-XX-XX"
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.addressSection}>
                    <div className={styles.addressHeader}>
                        <h3 className={styles.sectionTitle}>
                            <FaMapMarkerAlt className={styles.icon} /> Мои
                            адреса
                        </h3>
                        <button
                            className={styles.addButton}
                            type="button"
                            onClick={openModalHandler}
                        >
                            + Добавить адрес
                        </button>
                    </div>

                    <div className={styles.addressContainer}>
                        {formData.addresses.length === 0 ? (
                            <div className={styles.emptyState}>
                                <FaMapMarkerAlt className={styles.emptyIcon} />
                                <p>У вас пока нет сохраненных адресов</p>
                                <button
                                    className={styles.addButton}
                                    type="button"
                                    onClick={openModalHandler}
                                >
                                    + Добавить первый адрес
                                </button>
                            </div>
                        ) : (
                            formData.addresses.map((address, index) => (
                                <div key={index} className={styles.addressCard}>
                                    <div className={styles.addressHeader}>
                                        <h4>Адрес {index + 1}</h4>
                                        <div className={styles.addressActions}>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    saveAddressHandler(index)
                                                }
                                                className={styles.saveButton}
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeAddressHandler(index)
                                                }
                                                className={styles.removeButton}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.addressForm}>
                                        <div className={styles.formGroup}>
                                            <label>
                                                <span>Страна</span>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={address.state}
                                                    onChange={(e) =>
                                                        handleAddressChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    placeholder="Россия"
                                                />
                                            </label>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>
                                                <span>Город</span>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={address.city}
                                                    onChange={(e) =>
                                                        handleAddressChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    placeholder="Москва"
                                                />
                                            </label>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>
                                                <span>Улица</span>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={address.street}
                                                    onChange={(e) =>
                                                        handleAddressChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    placeholder="Ленина"
                                                />
                                            </label>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>
                                                <span>
                                                    Номер дома и квартира
                                                </span>
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    value={address.zip}
                                                    onChange={(e) =>
                                                        handleAddressChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                    placeholder="10, кв. 25"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.submitSection}>
                <button className={styles.submitButton} type="submit">
                    Сохранить изменения
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

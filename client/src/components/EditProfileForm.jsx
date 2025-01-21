import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/features/auth/authSlice";

const EditProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        fullName: user.contactInfo?.fullName || "",
        email: user.contactInfo?.email || "",
        phone: user.contactInfo?.phone || "",
        address: {
            street: user.contactInfo?.address?.street || "",
            city: user.contactInfo?.address?.city || "",
            state: user.contactInfo?.address?.state || "",
            zip: user.contactInfo?.address?.zip || "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [name]: value,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ contactInfo: formData }));
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
                <label>ФИО</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Электронная почта</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Номер телефона</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Страна</label>
                <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                />
            </div>
            <div className="form-group">
                <label>Город</label>
                <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                />
            </div>
            <div className="form-group">
                <label>Улица</label>
                <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleAddressChange}
                />
            </div>
            <div className="form-group">
                <label>Номер дома</label>
                <input
                    type="text"
                    name="zip"
                    value={formData.address.zip}
                    onChange={handleAddressChange}
                />
            </div>
            <button className="greenButton" type="submit">Сохранить</button>
        </form>
    );
};

export default EditProfileForm;

import User from "../models/User.js";

// Добавление адреса
export const addAddress = async (req, res) => {
    const { userId, address } = req.body;
    try {
        const user = await User.findById(userId);
        if (user.contactInfo.addresses.length >= 5) {
            return res
                .status(400)
                .json({ message: "Нельзя добавить более 5 адресов." });
        }
        user.contactInfo.addresses.push(address);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера." });
    }
};

// Удаление адреса
export const removeAddress = async (req, res) => {
    const { userId, addressId } = req.body;
    try {
        const user = await User.findById(userId);
        user.contactInfo.addresses = user.contactInfo.addresses.filter(
            (addr) => addr._id.toString() !== addressId
        );
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера." });
    }
};

// Обновление адреса
export const updateAddress = async (req, res) => {
    const { userId, addressId, address } = req.body;
    try {
        const user = await User.findById(userId);
        const addrIndex = user.contactInfo.addresses.findIndex(
            (addr) => addr._id.toString() === addressId
        );

        if (addrIndex === -1) {
            return res.status(404).json({ message: "Адрес не найден." });
        }

        user.contactInfo.addresses[addrIndex] = {
            ...user.contactInfo.addresses[addrIndex],
            ...address,
        };

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера." });
    }
};
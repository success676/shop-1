import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js";
import Favorites from "../models/Favorites.js";

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({ username });

        if (isUsed) {
            return res.json({ message: "Данный username уже занят." });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        await newUser.save();

        // Создание пустой корзины и избранного для нового пользователя
        const cart = new Cart({ user: newUser._id, products: [] });
        const favorites = new Favorites({ user: newUser._id, products: [] });
        await cart.save();
        await favorites.save();

        // Обновление пользователя с ID корзины и избранного
        newUser.cart = cart._id;
        newUser.favorites = favorites._id;
        await newUser.save();

        res.json({
            user: newUser,
            token,
            message: "Регистрация прошла успешно.",
        });
    } catch (error) {
        res.json({ message: "Ошибка при создании пользователя." });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ message: "Такого юзера не существует." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({ message: "Неверный логин или пароль." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.json({
            token,
            user,
            message: "Вы вошли в систему.",
        });
    } catch (error) {
        res.json({ message: "Ошибка при авторизации." });
    }
};

// Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: "Такого юзера не существует.",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            user,
            token,
        });
    } catch (error) {
        res.json({ message: "Нет доступа." });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { contactInfo } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { contactInfo },
            { new: true }
        );

        const token = jwt.sign(
            { id: updatedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({
            user: updatedUser,
            token,
            message: "Профиль успешно обновлен.",
        });
    } catch (error) {
        res.json({ message: "Ошибка при обновлении профиля." });
    }
};

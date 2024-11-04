import Favorites from "../models/Favorites.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Добавление продукта в избранное
export const addToFavorites = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Продукт не найден." });
        }

        let favorites = await Favorites.findOne({ user: userId });

        if (!favorites) {
            favorites = new Favorites({
                user: userId,
                products: [productId],
            });
        } else {
            const existingProduct = favorites.products.find(
                (item) => item.toString() === productId
            );

            if (existingProduct) {
                favorites.products = favorites.products.filter(
                    (item) => item.toString() !== productId
                );
            } else {
                favorites.products.push(productId);
            }
        }

        await favorites.save();

        try {
            await User.findByIdAndUpdate(userId, {
                favorites: favorites._id,
            });
        } catch (error) {
            console.log(error);
        }

        res.json(favorites);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка добавления товара в избранное.",
            error,
        });
    }
};

// Удаление продукта из избранного
export const removeFromFavorites = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let favorites = await Favorites.findOne({ user: userId });

        if (favorites) {
            favorites.products = favorites.products.filter(
                (item) => item.toString() !== productId
            );
            await favorites.save();
        }

        res.json(favorites);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка удаления товара из избранного.",
            error,
        });
    }
};

// Получение всех избранных продуктов пользователя
export const getFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await Favorites.findOne({ user: userId }).populate("products");

        if (favorites) {
            res.status(200).json(favorites.products);
        } else {
            res.status(404).json({ message: "No favorites found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Cart from "../models/Cart.js";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const createPurchase = async (req, res) => {
    try {
        const { userId, address } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Отсутствует идентификатор пользователя." });
        }

        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Корзина пуста." });
        }

        const totalPrice = cart.products.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );

        // Проверка наличия товара на складе
        for (const item of cart.products) {
            const product = await Product.findById(item.product._id);
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Недостаточно товара "${product.title}" на складе.`,
                });
            }
        }

        const purchase = new Purchase({
            user: userId,
            products: cart.products.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice,
            address, // Сохраняем адрес в заказе
        });

        await purchase.save();

        try {
            await User.findByIdAndUpdate(userId, {
                $push: { purchases: purchase._id },
            });
        } catch (error) {
            console.log(error);
        }

        // Уменьшение количества товара на складе
        for (const item of cart.products) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity },
            });
        }

        // Очистка корзины после покупки
        cart.products = [];
        await cart.save();

        res.json(purchase);
    } catch (error) {
        console.error("Ошибка создания покупки:", error);
        res.status(500).json({ message: "Ошибка создания покупки", error });
    }
};

export const getPurchases = async (req, res) => {
    try {
        const { userId } = req.params;

        const purchases = await Purchase.find({ user: userId }).populate("products.product");

        res.json(purchases);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка при загрузке покупок.",
            error,
        });
    }
};

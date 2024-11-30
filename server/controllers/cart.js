import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Продукт не найден." });
        }

        if (product.stock <= 0) {
            return res
                .status(400)
                .json({ message: "Товар отсутствует на складе." });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: 1 }],
            });
        } else {
            const existingProduct = cart.products.find(
                (item) => item.product.toString() === productId
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
        }

        await cart.save();

        try {
            await User.findByIdAndUpdate(userId, {
                cart: cart._id,
            });
        } catch (error) {
            console.log(error);
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка добавления товара в корзину.",
            error,
        });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Корзина не найдена." });
        }

        cart.products = cart.products.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: "Ошибка удаления товара из корзины.",
            error,
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId }).populate(
            "products.product"
        );

        if (!cart) {
            return res.status(404).json({ message: "Корзина не найдена." });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при загрузке корзины", error });
    }
};

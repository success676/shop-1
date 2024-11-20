import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Создание нового продукта
export const createProduct = async (req, res) => {
    const { title, price, imageUrl, category, gender, description } = req.body;

    try {
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
            return res.status(404).json({ message: "Категория не найдена." });
        }

        const newProduct = new Product({
            title,
            price,
            imageUrl,
            category: categoryDoc._id,
            gender,
            description,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение всех продуктов с фильтрами
export const getAllProducts = async (req, res) => {
    const { category, gender, price } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (gender) filter.gender = gender;
    if (price) filter.price = { $lte: price }; // Фильтр по цене (например, меньше или равно)

    try {
        const products = await Product.find(filter).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение продукта по ID
export const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).populate('category');

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Продукт не найден." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Обновление продукта по ID
export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { title, price, imageUrl, category, gender, description } = req.body;

    try {
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
            return res.status(404).json({ message: "Категория не найдена." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { title, price, imageUrl, category: categoryDoc._id, gender, description },
            { new: true }
        );

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Продукт не найден." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Удаление продукта по ID
export const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (deletedProduct) {
            res.status(200).json({ message: "Продукт удален." });
        } else {
            res.status(404).json({ message: "Продукт не найден." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

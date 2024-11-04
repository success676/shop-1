import Product from "../models/Product.js";

// Создание нового продукта
export const createProduct = async (req, res) => {
    const { title, price, imageUrl, category } = req.body;

    try {
        const newProduct = new Product({
            title,
            price,
            imageUrl,
            category,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение всех продуктов
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение продукта по ID
export const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

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
    const { title, price, imageUrl, category } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { title, price, imageUrl, category },
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

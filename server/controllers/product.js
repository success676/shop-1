import Product from "../models/Product.js";

// Создание нового продукта
export const createProduct = async (req, res) => {
    const { title, price, imageUrl, category, subcategory, gender } = req.body;

    try {
        const newProduct = new Product({
            title,
            price,
            imageUrl,
            category,
            subcategory,
            gender,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение всех продуктов с фильтрами
export const getAllProducts = async (req, res) => {
    const { category, subcategory, gender, price } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (gender) filter.gender = gender;
    if (price) filter.price = { $lte: price }; // Фильтр по цене (например, меньше или равно)

    try {
        const products = await Product.find(filter);
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
    const { title, price, imageUrl, category, subcategory, gender } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { title, price, imageUrl, category, subcategory, gender },
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

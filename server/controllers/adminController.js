import User from "../models/User.js";
import Product from "../models/Product.js";
import Purchase from "../models/Purchase.js";
import Category from "../models/Category.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { title, price, gender, category, description, stock } = req.body;
        if (req.files && req.files.image) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(
                path.join(__dirname, "..", "uploads", "goods", fileName)
            );

            const product = new Product({
                title,
                price,
                imageUrl: fileName,
                gender,
                category,
                description,
                stock,
            });

            await product.save();
            res.json(product);
        } else {
            res.status(400).json({ message: "Image file is required" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, gender, category, description, stock } = req.body;
        let updateData = { title, price, gender, category, description, stock };

        if (req.files && req.files.image) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(
                path.join(__dirname, "..", "uploads", "goods", fileName)
            );
            updateData.imageUrl = fileName;
        }

        const product = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate("user")
            .populate("products.product");
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePurchaseStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const purchase = await Purchase.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

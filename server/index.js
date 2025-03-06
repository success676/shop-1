import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js";
import cartRoute from "./routes/cart.js";
import purchaseRoute from "./routes/purchase.js";
import favoriteRoute from "./routes/favorite.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import adminRoutes from "./routes/admin.js";
import addressRoutes from "./routes/address.js";
import profileRoutes from "./routes/profile.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
app.use("/api/purchases", purchaseRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/profile", profileRoutes);

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rsuomkk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
        );

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();

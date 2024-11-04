import { Router } from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/product.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// http://localhost:3002/api/products
router.post("/", checkAuth, createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.put("/:productId", checkAuth, updateProduct);
router.delete("/:productId", checkAuth, deleteProduct);

export default router;

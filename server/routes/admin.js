import express from "express";
import {
    getUsers,
    updateUserRole,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getPurchases,
    updatePurchaseStatus,
    getCategories,
} from "../controllers/adminController.js";
import { checkAuth } from "../utils/checkAuth.js";
import { checkAdmin } from "../utils/checkAdmin.js";

const router = express.Router();

router.use(checkAuth, checkAdmin);

router.get("/users", getUsers);
router.put("/users/:id", updateUserRole);

router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/categories", getCategories);

router.get("/purchases", getPurchases);
router.put("/purchases/:id", updatePurchaseStatus);

export default router;

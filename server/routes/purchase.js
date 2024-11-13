import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPurchase, getPurchases } from "../controllers/purchase.js";

const router = new Router();

// Создание новой покупки
// http://localhost:3002/api/purchases
router.post("/create", createPurchase);

// Получение всех покупок пользователя
// http://localhost:3002/api/purchases
router.get("/:userId", checkAuth, getPurchases);

export default router;

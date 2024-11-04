import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPurchase, getPurchase } from "../controllers/purchase.js";

const router = new Router();

// Создание новой покупки
// http://localhost:3002/api/purchase
router.post("/create", createPurchase);

// Получение всех покупок пользователя
// http://localhost:3002/api/purchase
router.get("/:userId", checkAuth, getPurchase);

export default router;

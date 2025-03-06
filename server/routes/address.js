import { Router } from "express";
import {
    addAddress,
    removeAddress,
    updateAddress,
} from "../controllers/address.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Добавление адреса
router.post("/add", checkAuth, addAddress);

// Удаление адреса
router.delete("/remove", checkAuth, removeAddress);

// Обновление адреса
router.put("/update", checkAuth, updateAddress);

export default router;

import { Router } from "express";
import { addToCart, removeCartItem, getCart, updateCartItemQuantity } from "../controllers/cart.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Добавление/удаление товара из корзины при повторном нажатии на главной странице
// http://localhost:3002/api/cart
router.post("/addToCart", addToCart);

// Удаление товара из корзины по нажатию на крестик в корзине
// http://localhost:3002/api/cart
router.post("/removeCartItem", removeCartItem);

// Получение корзины пользователя
// http://localhost:3002/api/cart
router.get("/:userId", checkAuth, getCart); // test нужен ли тут checkAuth???

router.post("/updateQuantity", updateCartItemQuantity);

export default router;

import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { addToFavorites, removeFromFavorites, getFavorites } from "../controllers/favorite.js";

const router = new Router();

// http://localhost:3002/api/favorite
router.post("/add", addToFavorites);

// http://localhost:3002/api/favorite
router.post("/remove", removeFromFavorites);

// http://localhost:3002/api/favorite
router.get("/:userId", checkAuth, getFavorites);

export default router;

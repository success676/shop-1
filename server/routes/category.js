import { Router } from "express";
import { getAllCategories } from "../controllers/category.js";

const router = new Router();

router.get("/getAllCategories", getAllCategories);

export default router;

import { Router } from "express";
import { register, login, getMe, updateUser } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Register
// http://localhost:3002/api/auth
router.post("/register", register);

// Login
// http://localhost:3002/api/auth
router.post("/login", login);

// Get Me
// http://localhost:3002/api/auth
router.get("/me", checkAuth, getMe);

// Update User
// http://localhost:3002/api/auth
router.put("/update", checkAuth, updateUser);

export default router;

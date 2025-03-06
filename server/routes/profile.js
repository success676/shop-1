import { Router } from "express";
import {
    uploadProfilePhoto,
    deleteProfilePhoto,
} from "../controllers/profile.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

router.post("/upload/:userId", checkAuth, uploadProfilePhoto);

router.delete("/delete/:userId", checkAuth, deleteProfilePhoto);

export default router;

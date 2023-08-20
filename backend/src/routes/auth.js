import {
    login,
    register,
    logout,
    handleRefreshToken
} from "../controllers/auth.js";
import { createUserUpload } from "../middleware/imageMiddleware.js"; 
import express from "express";

const router = express.Router();
router.post("/register", createUserUpload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", handleRefreshToken);

export default router;
import {
    login,
    register,
    logout,
    handleRefreshToken
} from "../controllers/auth.js";
import express from "express";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", handleRefreshToken);

export default router;
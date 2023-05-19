import {
    getUser,
    updateUser
} from "../controllers/users.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);

export default router;

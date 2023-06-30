import {
    getUserById,
    updateUser
} from "../controllers/users.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";
import { editUserUpload } from "../middleware/imageMiddleware.js"; 

const router = express.Router();
router.get("/:id", authMiddleware, getUserById);
router.patch("/:id", authMiddleware, editUserUpload.single("avatar"), updateUser);

export default router;

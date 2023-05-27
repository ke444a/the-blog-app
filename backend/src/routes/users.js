import {
    getUserById,
    updateUser,
    // getUserByUsername
} from "../controllers/users.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";
import { editUserUpload } from "../middleware/imageMiddleware.js"; 

const router = express.Router();
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, editUserUpload.single("avatar"), updateUser);

export default router;

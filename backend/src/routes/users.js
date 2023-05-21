import {
    getUserById,
    getUserByUsername,
    updateUser
} from "../controllers/users.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";
import { userUpload } from "../middleware/imageMiddleware.js"; 

const router = express.Router();
router.get("/:id", authMiddleware, getUserById);
router.get("/username/:username", authMiddleware, getUserByUsername);
router.put("/:id", authMiddleware, userUpload.single("avatar"), updateUser);

export default router;

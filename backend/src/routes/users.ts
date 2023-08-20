import { getUserById, updateUser } from "../controllers/users";
import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";
import { upload } from "../middleware/multerMiddleware";
import { fileUploadMiddleware } from "../middleware/fileUploadMiddleware";

const router = express.Router();
router.get("/:id", authMiddleware, getUserById);
router.patch(
    "/:id",
    authMiddleware,
    upload.single("avatar"),
    fileUploadMiddleware,
    updateUser,
);

export default router;

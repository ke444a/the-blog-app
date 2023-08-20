import { login, register, logout } from "../controllers/auth";
import { upload } from "../middleware/multerMiddleware";
import express from "express";
import { fileUploadMiddleware } from "../middleware/fileUploadMiddleware";

const router = express.Router();
router.post(
    "/register",
    upload.single("avatar"),
    fileUploadMiddleware,
    register,
);
router.post("/login", login);
router.get("/logout", logout);

export default router;

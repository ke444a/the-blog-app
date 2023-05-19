import {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
} from "../controllers/posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/imageMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getSinglePost);
router.post("/", authMiddleware, upload.single("postImg"), createPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;

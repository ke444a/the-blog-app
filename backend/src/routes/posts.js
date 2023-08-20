import {
    getAllPosts,
    getSinglePost,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
} from "../controllers/posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { postUpload } from "../middleware/imageMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getSinglePost);
router.get("/author/:id", authMiddleware, getPostsByAuthor);
router.post("/", authMiddleware, postUpload.single("postImg"), createPost);
router.patch("/:id", authMiddleware, postUpload.single("postImg"), updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;

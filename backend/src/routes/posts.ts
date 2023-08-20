import {
    getAllPosts,
    getSinglePost,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/posts";
import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/multerMiddleware";
import express from "express";
import { fileUploadMiddleware } from "../middleware/fileUploadMiddleware";

const router = express.Router();
router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getSinglePost);
router.get("/author/:id", authMiddleware, getPostsByAuthor);
router.post(
    "/",
    authMiddleware,
    upload.single("postImg"),
    fileUploadMiddleware,
    createPost,
);
router.patch(
    "/:id",
    authMiddleware,
    upload.single("postImg"),
    fileUploadMiddleware,
    updatePost,
);
router.delete("/:id", authMiddleware, deletePost);

export default router;

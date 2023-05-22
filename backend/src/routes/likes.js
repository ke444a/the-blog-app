import {
    likePost,
    dislikePost,
    getPostLikesNumber,
    checkUserLike
} from "../controllers/likes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/likes/:id", authMiddleware, getPostLikesNumber);
router.get("/user/likes/", authMiddleware, checkUserLike);
router.post("/like", authMiddleware, likePost);
router.post("/dislike", authMiddleware, dislikePost);

export default router;

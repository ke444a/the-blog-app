import {
    likePost,
    dislikePost,
    checkUserLike
} from "../controllers/likes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/user/likes/", authMiddleware, checkUserLike);
router.post("/like", authMiddleware, likePost);
router.post("/dislike", authMiddleware, dislikePost);

export default router;

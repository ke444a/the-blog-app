import { likePost, dislikePost, checkLike } from "../controllers/likes";
import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();
router.get("/user/likes/", authMiddleware, checkLike);
router.post("/like", authMiddleware, likePost);
router.post("/dislike", authMiddleware, dislikePost);

export default router;

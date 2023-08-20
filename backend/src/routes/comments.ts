import { createComment, getPostComments } from "../controllers/comments";
import { authMiddleware } from "../middleware/authMiddleware";
import express from "express";

const router = express.Router();
router.get("/post/:id", authMiddleware, getPostComments);
router.post("/", authMiddleware, createComment);

export default router;

import { 
    createComment,
    getComment,
    getPostComments,
} from "../controllers/comments.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.get("/:id", authMiddleware, getComment);
router.get("/post/:id", authMiddleware, getPostComments);
router.post("/", authMiddleware, createComment);

export default router;

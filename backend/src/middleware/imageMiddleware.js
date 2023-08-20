import multer from "multer";
import path from "path";
import User from "../models/User.js";

const storage = multer.memoryStorage();

const postStorage = process.env.NODE_ENV === "dev" ? multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/posts/");
    },
    filename(req, file, cb) {
        cb(null, `post-${Date.now()}${path.extname(file.originalname)}`);
    }
}) : storage;

const editUserStorage = process.env.NODE_ENV === "dev" ? multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/users/");
    },
    async filename(req, file, cb) {
        const user = await User.findById(req.params.id);
        cb(null, `user-${user.username}${path.extname(file.originalname)}`);
    }
}) : storage;

const createUserStorage = process.env.NODE_ENV === "dev" ? multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/users/");
    },
    filename(req, file, cb) {
        cb(null, `user-${req.body.username}${path.extname(file.originalname)}`);
    }
}) : storage;

export const postUpload = multer({ storage: postStorage });
export const editUserUpload = multer({ storage: editUserStorage });
export const createUserUpload = multer({ storage: createUserStorage });

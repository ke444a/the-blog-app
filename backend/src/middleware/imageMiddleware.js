import multer from "multer";
import path from "path";
import User from "../models/User.js";

const postStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/posts/");
    },
    filename(req, file, cb) {
        cb(null, `post-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const userStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/users/");
    },
    async filename(req, file, cb) {
        const user = await User.findById(req.params.id);
        cb(null, `user-${user.username}${path.extname(file.originalname)}`);
    }
});

export const postUpload = multer({ storage: postStorage });
export const userUpload = multer({ storage: userStorage });

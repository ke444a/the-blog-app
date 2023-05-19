import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./uploads/posts/");
    },
    filename(req, file, cb) {
        cb(null, `post-${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ storage: storage });

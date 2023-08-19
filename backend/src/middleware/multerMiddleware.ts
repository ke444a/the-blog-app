import multer, { diskStorage, memoryStorage } from "multer";

export const upload = multer({ storage: diskStorage({}) });

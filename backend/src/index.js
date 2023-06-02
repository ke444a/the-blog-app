import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import likesRoutes from "./routes/likes.js";
import commentsRoutes from "./routes/comments.js";
import path from "path";

dotenv.config({ path: "../.env" });
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB_URI || "";

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:4173", process.env.FRONTEND_SERVER_PROD],
    credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/uploads/", express.static(path.join(process.cwd(), "/uploads/")));
app.use("/posts", postsRoutes);
app.use("/posts", likesRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentsRoutes);

mongoose.connect(MONGODB).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}).catch( (error) => {
    console.log(error.message);
});

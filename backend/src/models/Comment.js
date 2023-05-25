import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Post" }
}, {
    timestamps: true
});

export default model("Comment", commentSchema);

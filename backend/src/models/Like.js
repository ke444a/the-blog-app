import { Schema, model } from "mongoose";

const likeSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

export default model("Like", likeSchema);

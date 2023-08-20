import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true, maxLength: 100  },
    content: { type: String, required: true},
    preview: { type: String, required: true, maxLength: 120 },
    likesNumber: { type: Number, default: 0 },
    authorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    comments: { type: [Schema.Types.ObjectId], default: [], ref: "Comment" },
    postImg: String
}, { timestamps: true });

export default model("Post", postSchema);

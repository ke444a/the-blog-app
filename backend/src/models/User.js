import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, maxLength: 120 },
    avatar: String,
    fullName: { type: String, required: true},
    refreshToken: String
});

export default model("User", userSchema);

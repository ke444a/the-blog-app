import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const existingPost = await Post.findById(req.body.postId);
        existingPost.comments.push(newComment);
        await Post.findByIdAndUpdate(req.body.postId, existingPost);
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};

export const getPostComments = async (req, res) => {
    try {
        const postComments = await Comment.find({ postId: req.params.id });
        res.status(200).json(postComments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

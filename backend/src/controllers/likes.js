import Post from "../models/Post.js";
import Like from "../models/Like.js";

export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const foundLike = await Like.findOne({ postId, userId }).exec();
        if (foundLike) {
            return res.status(400).json({ message: "Like already exists" });
        }

        const existingPost = await Post.findById(postId);
        existingPost.likesNumber += 1;
        await Post.findByIdAndUpdate(postId, existingPost, { new: true });
        
        const like = new Like({
            postId,
            userId
        });
        await like.save();
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const dislikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const existingPost = await Post.findById(postId);
        existingPost.likesNumber -= 1;
        await Post.findByIdAndUpdate(postId, existingPost, { new: true });
        
        await Like.findOneAndDelete({ postId, userId });
        res.status(200).json({ message: "Post disliked successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const checkUserLike = async (req, res) => {
    try {
        const { userId, postId } = req.query;
        const userLike = await Like.findOne({ userId, postId }).exec();
        const isLiked = !!userLike;
        res.status(200).json({ isLiked });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

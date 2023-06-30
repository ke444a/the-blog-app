import User from "../models/User.js";
import Post from "../models/Post.js";
import Like from "../models/Like.js";

export const seedLikes = async () => {
    const usersList = await User.find({});
    const postsList = await Post.find({});
    const likesList = [];

    for (let i = 0; i < 1000; i++) {
        const like = {
            postId: postsList[Math.floor(Math.random() * postsList.length)]._id,
            userId: usersList[Math.floor(Math.random() * usersList.length)]._id
        };
        
        await Post.findByIdAndUpdate(like.postId, {$inc: { likesNumber: 1} }, { new: true, timestamps: false });
    }

    await Like.deleteMany({});
    await Like.insertMany(likesList);
};

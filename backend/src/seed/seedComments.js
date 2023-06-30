import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { faker } from "@faker-js/faker";

export const seedComments = async () => {
    const usersList = await User.find({});
    const postsList = await Post.find({});
    const commentsList = [];

    for (let i = 0; i < 100; i++) {
        const comment = {
            postId: postsList[Math.floor(Math.random() * postsList.length)]._id,
            authorId: usersList[Math.floor(Math.random() * usersList.length)]._id,
            content: faker.lorem.sentences({ min: 1, max: 3 })
        };
        
        const existingPost = await Post.findById(comment.postId);
        existingPost.comments.push(new Comment(comment));
        await Post.findByIdAndUpdate(comment.postId, existingPost, { timestamps: false });
        commentsList.push(comment);
    }
    await Comment.deleteMany({});
    await Comment.insertMany(commentsList);
};

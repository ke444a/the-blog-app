import { faker } from "@faker-js/faker";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const seedPosts = async () => {
    const usersList = await User.find({});
    const postsList = [];
    for (let i = 0; i < 100; i++) {
        const post = {
            title: faker.lorem.sentence({ max: 8 }),
            content: faker.lorem.paragraphs({ min: 4, max: 9 }),
            preview: faker.lorem.sentence({ min: 6, max: 12 }),
            authorId: usersList[Math.floor(Math.random() * usersList.length)]._id,
            postImg: faker.image.url()
        };
        postsList.push(post);
    }

    await Post.deleteMany({});
    await Post.insertMany(postsList);
};

import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedUsers } from "./seedUsers.js";
import { seedPosts } from "./seedPosts.js";
import { seedLikes } from "./seedLikes.js";
import { seedComments } from "./seedComments.js";
dotenv.config({ path: "../.env" });

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log("MongoDB: Seeding the data..."))
    .then(() => seedUsers())
    .then(() => seedPosts())
    .then(() => seedLikes())
    .then(() => seedComments())
    .then(() => {
        console.log("MongoDB: Seeding completed");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });

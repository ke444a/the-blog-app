import { faker } from "@faker-js/faker";
import User from "../models/User.js";

export const seedUsers = async () => {
    const usersList = [];
    for (let i = 0; i < 10; i++) {
        const user = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
            fullName: faker.person.fullName(),
            bio: faker.person.bio(),
            avatar: faker.image.avatar()
        };
        usersList.push(user);
    }

    await User.deleteMany({});
    await User.insertMany(usersList);
};

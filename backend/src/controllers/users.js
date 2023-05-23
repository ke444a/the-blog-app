import User from "../models/User.js";

export const getUserById = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        if (!foundUser) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username,
            fullName: foundUser.fullName,
            avatar: foundUser.avatar,
            bio: foundUser.bio
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.params.username });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username,
            fullName: foundUser.fullName,
            avatar: foundUser.avatar,
            bio: foundUser.bio
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        if (!req.body?.username || !req.body?.fullName) {
            return res.send(400).json({ message: "Username and full name are required"});
        }

        let avatar = "";
        if (req?.file) {
            avatar = req.protocol + "://" + req.hostname + `:${process.env.PORT}/uploads/users/` + req.file.filename;
        }

        const updatedInfo = {
            ...req.body,
            avatar
        };
        const foundUser = await User.findByIdAndUpdate(req.params.id, updatedInfo, { new: true });
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

import User from "../models/User.js";

export const getUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
    try {
        const foundUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

import User from "../models/User.js";
import { uploadUserToFirebase } from "../utils/uploadImagesToFirebase.js";

export const getUserById = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id).select("-password").select("-refreshToken");
        if (!foundUser) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json({ message: "Unable to get the data about this user" });
    }
};

export const updateUser = async (req, res) => {
    try {
        if (!req.body?.username || !req.body?.fullName) {
            return res.status(400).json({ message: "Username and full name are required"});
        }

        let updatedInfo = { ...req.body };
        if (req?.file) {
            if (process.env.NODE_ENV === "dev") {
                updatedInfo.avatar = req.protocol + "://" + req.hostname + `:${process.env.PORT}/uploads/users/` + req.file.filename;
            } else {
                updatedInfo.avatar = await uploadUserToFirebase(req.file.buffer, req.body.username);
            }
        }

        const foundUser = await User.findByIdAndUpdate(req.params.id, updatedInfo, { new: true });
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(400).json({ message: "Unable to update the user" });
    }
};

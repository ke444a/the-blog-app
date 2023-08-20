import jwt from "jsonwebtoken";

export const generateJwtToken = (
    userId: string,
    TOKEN_SECRET: string,
    expiryTime: string,
) => {
    return jwt.sign({ id: userId }, TOKEN_SECRET, { expiresIn: expiryTime });
};

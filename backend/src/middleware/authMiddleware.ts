import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Authorization token is required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "");
        const user = await prisma.user.findUnique({
            where: {
                id: (decoded as JwtPayload)?.id,
            },
        });
        req.user = user as IUser;
        next();
    } catch (error) {
        next(error);
    }
};

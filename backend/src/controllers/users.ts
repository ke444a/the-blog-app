import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(foundUser);
    } catch (error) {
        next({ error, message: "User not found." });
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: req.params.id,
            },
            data: {
                ...req.body,
                avatar: req.image || undefined,
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        next({
            error,
            message: "Unable to update the user with given details.",
        });
    }
};

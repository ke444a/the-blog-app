import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newComment = await prisma.comment.create({
            data: req.body,
        });
        res.status(201).json(newComment);
    } catch (error) {
        next({ error, message: "Unable to create new coment" });
    }
};

export const getPostComments = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const postComments = await prisma.comment.findMany({
            where: {
                postId: req.params.id,
            },
            include: {
                author: true,
            },
        });
        if (!postComments) {
            return res.status(404).json({ message: "Comments not found" });
        }
        res.status(200).json(postComments);
    } catch (error) {
        next({
            error,
            message: "Unable to retrieve the comments for the given post",
        });
    }
};

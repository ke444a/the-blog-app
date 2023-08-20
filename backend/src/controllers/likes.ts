import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export const likePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId, userId } = req.body;
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likesNumber: { increment: 1 },
                likes: {
                    create: [
                        {
                            userId,
                        },
                    ],
                },
            },
        });
        res.status(201).json(updatedPost);
    } catch (error) {
        next({ error, message: "Unable to like this post" });
    }
};

export const dislikePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { postId, userId } = req.body;
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likesNumber: { decrement: 1 },
                likes: {
                    delete: [
                        {
                            likeId: {
                                postId,
                                userId,
                            },
                        },
                    ],
                },
            },
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        next({ error, message: "Unable to dislike this post" });
    }
};

export const checkLike = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId, postId } = req.query;
        const userLike = await prisma.like.findUnique({
            where: {
                likeId: {
                    postId: postId as string,
                    userId: userId as string,
                },
            },
        });
        res.status(200).json({ isLiked: !!userLike });
    } catch (error) {
        next({
            error,
            message: "Unable to verify the like for the given post",
        });
    }
};

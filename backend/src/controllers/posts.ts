import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export const getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { page = 1, pageSize = 9 } = req.query;
    try {
        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / Number(pageSize));
        const posts = await prisma.post.findMany({
            orderBy: {
                updatedAt: "desc",
            },
            skip: (Number(page) - 1) * Number(pageSize),
            take: Number(pageSize),
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });

        if (!posts) {
            res.status(404).json({ message: "Posts not found" });
        }

        res.status(200).json({
            page,
            totalPages,
            posts,
        });
    } catch (error) {
        next({ error, message: "Posts not found" });
    }
};

export const getSinglePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: {
                id: req.params.id,
            },
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });
        res.status(200).json(post);
    } catch (error) {
        next({ error, message: "Post not found." });
    }
};

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const newPost = await prisma.post.create({
            data: {
                ...req.body,
                postImg: req.image,
                updatedAt: new Date(),
            },
        });
        res.status(201).json(newPost);
    } catch (error) {
        next({
            error,
            message: "Unable to create the post with given details.",
        });
    }
};

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: req.params.id,
            },
            data: {
                ...req.body,
                postImg: req.image || undefined,
                updatedAt: new Date(),
            },
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        next({
            error,
            message: "Unable to update the post with given details.",
        });
    }
};

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const deletingPost = await prisma.post.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletingPost);
    } catch (error) {
        next({ error, message: "Unable to delete the post." });
    }
};

export const getPostsByAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const postsByAuthor = await prisma.post.findMany({
            where: {
                authorId: req.params.id,
            },
            include: {
                comments: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        bio: true,
                        avatar: true,
                        fullName: true,
                    },
                },
            },
        });
        if (!postsByAuthor) {
            res.status(404).json("Posts not found for the given author.");
        }

        res.status(200).json(postsByAuthor);
    } catch (error) {
        next({
            error,
            message: "Unable to retrieve the posts for the given author.",
        });
    }
};

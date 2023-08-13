import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newComment = await prisma.comment.create({
            data: req.body
        });
        res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};

// export const getComment = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const foundComment = await prisma.comment.findUnique({
//             where: {
//                 id: req.params.id
//             },
//             include: {
//                 author: true
//             }
//         });
//         if (!foundComment) {
//             return res.status(404).json({ message: "Comment not found" });
//         }
//         res.status(200).json(foundComment);
//     } catch (error) {
//         next(error);
//     }
// };

export const getPostComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postComments = await prisma.comment.findMany({
            where: {
                postId: req.params.id
            },
            include: {
                author: true
            }
        });
        if (!postComments) {
            return res.status(404).json({ message: "Comments not found" });
        }
        res.status(200).json(postComments);
    } catch (error) {
        next(error);
    }
};

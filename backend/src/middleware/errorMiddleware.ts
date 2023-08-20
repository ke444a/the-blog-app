import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    error: Error & { message: string },
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    return res.status(500).json({ message: error.message });
};

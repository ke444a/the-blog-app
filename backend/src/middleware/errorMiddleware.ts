import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
    } else {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
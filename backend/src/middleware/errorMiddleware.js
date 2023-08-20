export const errorMiddleware = (error, req, res, next) => {
    if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
    } else {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
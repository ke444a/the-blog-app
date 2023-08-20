export {};

declare global {
    namespace Express {
        export interface Request {
            user?: IUser | null;
            image?: string;
        }
    }
}

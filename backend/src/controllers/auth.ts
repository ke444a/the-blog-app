import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { generateJwtToken } from "../utils/generateJwtToken";
import prisma from "../config/prisma";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const registeringUser = req.body;
    if (!registeringUser.username || !registeringUser.password || !registeringUser.fullName) {
        return res.status(400).json({ message: "Username, password, and full name are required." });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            username: registeringUser.username
        }
    });
    if (existingUser) {
        return res.status(409).json({ message: "User with the given username already exists!"});
    }

    try {
        const hashedPassword = await bcrypt.hash(registeringUser.password, 10);
        const newUser = await prisma.user.create({
            data: {
                ...registeringUser,
                avatar: req.image,
                password: hashedPassword
            }
        });
        const token = generateJwtToken(newUser.id, process.env.TOKEN_SECRET || "", "1d");
        
        res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24*60*60*1000});
        res.status(201).json({ user: newUser });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password: userPassword } = req.body;
        if (!username || !userPassword) {
            return res.status(400).json({ message: "Username and password are required!" });
        }
    
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!user) {
            return res.status(404).json({ message: "Invalid username!" });
        }

        const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        const token = generateJwtToken(user.id, process.env.TOKEN_SECRET || "", "1d");
        const { password, ...userWithoutPassword } = user;
        res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24*60*60*1000});
        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }
    
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

// export const handleRefreshToken = async (req: Request, res: Response) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) {
//         return res.status(401).json({ message: "No refresh token!" });
//     }

//     const refreshToken = cookies.jwt;
//     const foundUser = await User.findOne({ refreshToken }).exec();
//     if (!foundUser) {
//         return res.status(200).json({ message: "No user with given refresh token"} );
//     }

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET || "",
//         (err: Error | null, decoded: any) => {
//             if (err) {
//                 return res.status(403).json({ message: err.message });
//             }
//             const accessToken = generateJwtToken(decoded.id, process.env.ACCESS_TOKEN_SECRET || "", "30s");
//             res.status(201).json({ accessToken });
//         }
//     );
// };

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET as string, (error: any, userId: any) => {
        if (error)
            return res.sendStatus(401);
        req.userId = userId.userId;
        next();
    });
};

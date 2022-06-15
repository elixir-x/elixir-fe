import { Request, Response, NextFunction } from 'express';
import { UserDocument } from "../models/user/user.profile";
import "express-session";

declare module 'express-serve-static-core' {
    interface Request {}
}

declare module 'express-session' {
    export interface SessionData {
        userId: string | null;
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId)
        return next();
    else return res.sendStatus(401);
};

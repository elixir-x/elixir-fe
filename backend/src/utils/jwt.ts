import jwt, { VerifyCallback, JwtPayload } from "jsonwebtoken";

export const generateToken = (data: any, expiresIn: string | number | undefined = undefined) => {
    return jwt.sign(data, process.env.SECRET as string, { expiresIn });
}

export const verifyToken = (data: string, callback: VerifyCallback<string | JwtPayload> | undefined) => {
    return jwt.verify(data, process.env.SECRET as string, callback);
}

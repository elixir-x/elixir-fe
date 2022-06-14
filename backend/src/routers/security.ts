import express from "express";
import { sendError, sendData, sendSuccess } from "../utils/request-util";
import UserProfile, { IUserProfile } from "../models/user/user.profile";
import { generateToken } from "../utils/jwt";
import argon2 from "argon2";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
        return sendError(res, { error: 'Missing parameters!', code: 404 });

    const userObject: IUserProfile = await UserProfile.findOne({})
        .or([{ 'username': user }, { 'email': user }]).lean();
    const verified = await argon2.verify(userObject.password, password);

    if (verified) {
        const token = generateToken({ userId: userObject._id }, '3600s');

        res.cookie('token', token, {
            secure: true,
            sameSite: 'lax', // TODO: Change this after!
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 14
        });

        await UserProfile.updateOne(userObject, { lastLogin: new Date(Date.now()) });

        sendData(res, { token });
    } else sendError(res, { error: 'Login failed.' });
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
        return sendError(res, { error: 'Missing parameters!' });

    else {
        argon2.hash(password).then(hashed => {
            UserProfile.create({ email, username, password: hashed }, (error, result) => {
                if (error)
                    sendError(res, { error: 'An error has occurred during the registration process.' });

                else sendData(res, { user: result });
            });
        });
    }
});

export default router;

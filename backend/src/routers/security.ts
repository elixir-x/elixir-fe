import express from "express";
import { sendError, sendData } from "../utils/request-util";
import UserProfile from "../models/user/UserProfile";
import { generateToken } from "../utils/jwt";
import argon2 from "argon2";
const router = express.Router();

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
        return sendError(res, { error: 'Missing parameters!', code: 404 });

    const userObject = await UserProfile.findOne({})
        .or([{'username': user}, {'email': user}]).lean();

    const verified = await argon2.verify(userObject.password, password);

    if (verified) {
        const token = generateToken({ userId: userObject._id }, '3600s');
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
                    sendError(res, { error: 'An error has occured during the registration process.' });
                else sendData(res, { user: result });
            });
        });
    }
});

export default router;

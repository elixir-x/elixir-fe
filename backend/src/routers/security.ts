import express from "express";
import { sendError, sendData } from "../utils/request-util";
import UserProfile from "../models/user/user.profile";
import { deleteUserSession, regenerateUserSession } from "../utils/session";
import argon2 from "argon2";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
        return sendError(res, { message: 'Missing parameters!', code: 404 });

    UserProfile
        .findOne({})
        .or([{ 'username': user }, { 'email': user }])
        .exec(async (error, doc) => {
            if (doc) {
                const verified = await doc.checkPassword(password);
                console.log('sex');
                if (verified) {
                    regenerateUserSession(req, doc, error => {
                        if (error)
                            return sendError(res, { message: 'Login failed.' });
                    });
                    doc.lastLogin = new Date(Date.now());
                    await doc.save();
                    res.sendStatus(200);
                }
            } else sendError(res, { message: 'Login failed.' });
        });
});

router.get('/logout', (req, res) => {
    deleteUserSession(req);
    return res.sendStatus(200);
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
        return sendError(res, { message: 'Missing parameters!' });
    else {
        const hashedPassword = await argon2.hash(password);
        UserProfile.create({ email, username, password: hashedPassword }, (error, result) => {
            if (error)
                sendError(res, { message: 'An error has occurred during the registration process.' });
            else sendData(res, { user: result });
        });
    }
});

export default router;

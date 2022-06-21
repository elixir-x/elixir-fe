import express from "express";
import { sendError, sendData } from "../utils/request-util";
import UserProfile from "../models/user/user.profile";
import { deleteUserSession, regenerateUserSession } from "../utils/session";

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
                if (await doc.checkPassword(password)) {
                    regenerateUserSession(req, doc, error => {
                        if (error)
                            return sendError(res, { message: 'Login failed.' });
                    });
                    doc.lastLogin = new Date(Date.now());
                    await doc.save();
                    return res.sendStatus(200);
                }
            }
            sendError(res, { message: 'Login failed.' });
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
        UserProfile.create({ email, username, password }, (error, result) => {
            if (error)
                sendError(res, { message: 'An error has occurred during the registration process.' });
            else sendData(res, { user: result });
        });
    }
});

export default router;

import express from "express";
import { sendError, sendData } from "../utils/request-util";
import UserProfile, { UserDocument } from "../models/user/user.profile";
import argon2 from "argon2";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
        return sendError(res, { message: 'Missing parameters!', code: 404 });

    const userObject: UserDocument = await UserProfile.findOne({})
        .or([{ 'username': user }, { 'email': user }]).lean();
    const verified = await argon2.verify(userObject.password, password);

    if (verified) {
        // regenerate the session to prevent session fixation attack vectors
        req.session.regenerate(error => {
            if (error)
                return sendError(res, { message: 'Login failed.' });

            // store database user in session object (to be saved)
            req.session.userId = userObject._id.toString();

            // save the new session to database
            req.session.save(error => {
                if (error)
                    return sendError(res, { message: 'Login failed.' });
            });
        });
        UserProfile.updateOne(userObject, { lastLogin: new Date(Date.now()) });
        return res.sendStatus(200);
    } else sendError(res, { message: 'Login failed.' });
});

router.get('/logout', (req, res) => {
    req.session.userId = null;

    // clear user in session object (to be saved)
    req.session.save(error => {
        if (error)
            return sendError(res, { message: 'An error has occurred during the logout process.' });

        // regenerate the session to prevent session fixation attack vectors
        req.session.regenerate(error => {
            if (error)
                return sendError(res, { message: 'An error has occurred during the logout process.' });
        });
    });
});

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
        return sendError(res, { message: 'Missing parameters!' });

    else {
        argon2.hash(password).then(hashed => {
            UserProfile.create({ email, username, password: hashed }, (error, result) => {
                if (error)
                    sendError(res, { message: 'An error has occurred during the registration process.' });

                else sendData(res, { user: result });
            });
        });
    }
});

export default router;

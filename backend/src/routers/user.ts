import express from "express";
import UserProfile from "../models/user/user.profile";
import { sendData, sendError } from "../utils/request-util";
import { authenticate } from "../middleware/authentication";
const router = express.Router();

router.get('/user', authenticate, async (req, res) => {
    UserProfile.findOne({ _id: req.session.userId }, '-password', (error, result) => {
        if (error || result === null)
            sendError(res, { message: 'This user does not exist!', code: 404 });
        else sendData(res, result);
    });
});

router.patch('/user', authenticate, async (req, res) => {
    const { email, username, profile_url } = req.body;
    UserProfile.findOneAndUpdate({ _id: req.session.userId }, { username, email, profile_url }, { new: true },
        (error, result) => {
        if (error || result === null)
            sendError(res, { message: 'No users found!', code: 404 });
        else sendData(res, result);
    });
});

router.get('/users/:username', async (req, res) => {
    UserProfile.findOne({ username: req.params.username }, '-_id username', (error, result) => {
        if (error || result === null)
            sendError(res, { message: 'This user does not exist!', code: 404 });
        else sendData(res, result);
    });
});

router.get('/users', async (req, res) => {
    UserProfile.find({}, '-_id username email', (error, result) => {
        if (error || result === null)
            sendError(res, { message: 'No users found!', code: 404 });
        else sendData(res, result);
    })
});

export default router;

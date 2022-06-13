import express from "express";
import UserProfile from "../models/user/UserProfile";
import { sendData, sendError } from "../utils/request-util";
import { authenticateToken } from "../middleware/token.auth";
const router = express.Router();

router.get('/user', authenticateToken, async (req, res) => {
    UserProfile.findOne({ _id: req.userId }, '', (error, result) => {
        if (error || result === null)
            sendError(res, { error: 'This user does not exist!', code: 404 });
        else sendData(res, result);
    });
});

router.patch('/user', authenticateToken, async (req, res) => {
    const { email, username, profile_url } = req.body;
    UserProfile.findOneAndUpdate({ _id: req.userId }, { username, email, profile_url }, { new: true },
        (error, result) => {
        if (error || result === null)
            sendError(res, { error: 'No users found!', code: 404 });
        else sendData(res, result);
    });
});

router.get('/users/:username', async (req, res) => {
    UserProfile.findOne({ username: req.params.username }, '-_id username', (error, result) => {
        if (error || result === null)
            sendError(res, { error: 'This user does not exist!', code: 404 });
        else sendData(res, result);
    });
});

router.get('/users', async (req, res) => {
    UserProfile.find({}, '-_id username email', (error, result) => {
        if (error || result === null)
            sendError(res, { error: 'No users found!', code: 404 });
        else sendData(res, result);
    })
});

export default router;

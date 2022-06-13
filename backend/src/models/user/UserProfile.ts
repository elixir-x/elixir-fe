import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profile_url: String,
    lastLogin: {
        type: Date,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model('user', userSchema);

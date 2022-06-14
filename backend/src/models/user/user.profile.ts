import mongoose, { Types, Schema } from "mongoose";

export interface IUserProfile {
    _id: Types.ObjectId
    email: string,
    username: string,
    password: string,
    profile_url?: string,
    lastLogin: Date,
    createdAt: Date,
}

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

export default mongoose.model<IUserProfile>('user', userSchema);

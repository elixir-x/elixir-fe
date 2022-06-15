import mongoose, { Schema, Types } from "mongoose";
import argon2 from "argon2";

export interface UserDocument {
    _id: Types.ObjectId
    email: string,
    username: string,
    password: string,
    profile_url?: string,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
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
}, { timestamps: true });

export default mongoose.model<UserDocument>('user', userSchema);

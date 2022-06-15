import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./src/routers/user";
import securityRouter from "./src/routers/security";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

const mongoStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
    ttl: 60 * 60 * 24 * 14
});

const startup = () => {
    console.log('Mongoose database has been connected.');
    app.use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(cors({
            credentials: true,
            origin: process.env.ORIGIN_URL
        }))
        .use(session({
            name: '_sid',
            secret: process.env.SECRET as string,
            resave: false,
            saveUninitialized: false,
            store: mongoStore,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 14,
            }
        }));

    app.use('/api/v1/', userRouter, securityRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Elixir backend is listening on port ${process.env.PORT}.`)
    });
}

console.log('Starting backend...');

mongoose.connect("mongodb://127.0.0.1:27017/elixir", {
        connectTimeoutMS: 3000,
        serverSelectionTimeoutMS: 5000,
    }).then(startup).catch(console.log);


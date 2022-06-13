import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./src/routers/user";
import securityRouter from './src/routers/security';

dotenv.config();

console.log('Starting backend...')
mongoose
    .connect("mongodb://127.0.0.1:27017/elixir", {
        connectTimeoutMS: 3000,
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
        console.log('The database has been connected.');

        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cors({
            credentials: true,
            origin: 'http://localhost:3000'
        }));
        app.use('/api/v1/', userRouter, securityRouter);

        app.listen(process.env.PORT, () => {
            console.log(`Elixir backend is listening on port ${process.env.PORT}.`)
        });
    }).catch(err => console.log(err));


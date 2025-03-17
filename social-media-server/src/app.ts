// src/index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import userRouter  from "./routes/user.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;
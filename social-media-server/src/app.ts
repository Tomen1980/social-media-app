// src/index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import userRouter  from "./routes/user.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";

const app: Express = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

export default app;
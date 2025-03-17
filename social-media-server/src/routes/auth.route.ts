import { Router } from "express";
import authController from "../controller/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";
const authRouter = Router();

authRouter.post("/register",authController.register);
authRouter.post("/login",authController.login);

authRouter.get("/profile",verifyToken,authController.profile);
authRouter.put("/refresh-token",verifyToken,authController.refreshToken);
authRouter.delete("/logout",verifyToken,authController.logout);

export default authRouter;
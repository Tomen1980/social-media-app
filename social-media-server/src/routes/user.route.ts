import { Router} from "express";
import userController  from "../controller/user.controller";
import { verifyToken } from "../middleware/auth.middleware";
const userRouter = Router();

userRouter.get("/", userController.index);



export default userRouter
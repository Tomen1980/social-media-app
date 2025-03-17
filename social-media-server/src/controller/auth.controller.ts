import { Request,Response,NextFunction } from "express";
import AuthService from "../services/auth.service";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { AuthRequest } from "../middleware/auth.middleware";
class AuthController{

   async register(req:Request, res:Response, next:NextFunction){
    try {
        const data = req.body;
        const validatedData = await registerSchema.parseAsync(data);
        const result = await AuthService.register(validatedData);
        res.status(200).json(result);
    } catch (error : any) {
        next(error);
    }
    }

    async login(req:Request, res:Response, next:NextFunction){
        try {
            const data = req.body;
            await loginSchema.parseAsync(data);
            const result = await AuthService.login(data);

            res.cookie("accessToken", result.data.token, {
                maxAge: 15 * 60 * 60 * 1000 ,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });

            res.cookie("refreshToken", result.data.refreshToken, {
                maxAge: 30 * 60 * 60 * 1000 ,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async profile (req:AuthRequest, res:Response, next:NextFunction){
        try{
            const user = await AuthService.profile(req.user.id)
            res.json({
                message : "profile",
                data : user
            })
        }catch(err){
            next(err)
        }
    }

    async refreshToken(req:AuthRequest, res:Response, next:NextFunction){
        try{
            const refreshToken = req.cookies.refreshToken
            const id = req.user.id
            console.log(id)
            const result = await AuthService.refreshToken(refreshToken,id)
            res.cookie("accessToken", result.data.token, {
                maxAge: 15 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            res.cookie("refreshToken", result.data.refreshToken, {
                maxAge: 30 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            res.status(201).json(result)
        }catch(err){
            next(err)
        }
    }

    async logout(req:AuthRequest, res:Response, next:NextFunction){
        try{
            let result = await AuthService.logout(req.user.id)
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")
            res.status(201).json(result)
        }catch(err){
            next(err)
        }
    }
}

export default new AuthController
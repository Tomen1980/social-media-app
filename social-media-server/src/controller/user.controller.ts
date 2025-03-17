import { Request,Response,NextFunction } from "express";
import userServices from "../services/user.services";
import { AuthRequest } from "../middleware/auth.middleware";
import authService from "../services/auth.service";


class userController{

    async index(req:Request, res:Response, next:NextFunction){
        try{
            res.json({
                message : "index"
            })
        }catch(err){
            next(err)
        }
    }

  

}

export default new userController
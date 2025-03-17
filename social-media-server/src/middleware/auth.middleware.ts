import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


export interface AuthRequest extends Request {
    user?: any;
  }

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if(!token){
         res.status(401).json({ message: "Unauthorized Token" });
    }
    try{
        const decoded = jwt.verify(token, config.jwt.secret as string);
        req.user = decoded;
        next();
    }catch(error){
         res.status(403).json({ message: "Forbidden Token" });
    }
}
import { LoginDto, RegisterDto } from "../types/auth.dto";
import authRepository from "../repositories/auth.repository";
import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

class AuthService {

    async validationRegis(data: RegisterDto){
        let checkUsername = await userRepository.getUserByUsername(data.username);
        if(checkUsername){
            throw new Error("Username already exists");
        }
        let checkEmail = await userRepository.getUserByEmail(data.email);
        if(checkEmail){
            throw new Error("Email already exists");
        }
        if(data.password !== data.confirmPassword){
            throw new Error("Password and Confirm Password must be same");
        }
    }

   async register(data: RegisterDto){
    await this.validationRegis(data);
    //hashing password
    data.password = await bcrypt.hash(data.password, 10);
    let regis = await authRepository.register(data);
       return {
          status: "success",
          message: "Register Success",
          data: regis,
       }
   }     

   async login(data: LoginDto){
    let user;
    if(data.username){
        user = await userRepository.getUserByUsername(data.username);
        if(!user){
            throw new Error("Check your Account or Password");
        }
    }if(data.email){
         user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new Error("Check your Account or Password");
        }
    }else{
        throw new Error("Please input your Account");
    }
    let checkPassword = await bcrypt.compare(data.password, user.password);
    if(!checkPassword){
        throw new Error("Check your Account or Password");
    }
    let token = jwt.sign({id: user.id}, config.jwt.secret as string, {expiresIn: config.jwt.accessTokenExpires});
    let refreshToken = jwt.sign({id: user.id}, config.jwt.secret as string, {expiresIn:  config.jwt.refreshTokenExpires});
    await authRepository.updateRefreshToken(user.id, refreshToken);
    return {
        status: "success",
        message: "Login Success",
        data: {
            token,
            refreshToken,
        }
    }
}

    async profile(id: string){
        let user = await userRepository.getUserById(id);
        return {
            status: "success",
            message: "Get Profile Success",
            data: user,
        }
    }

    async refreshToken(refreshToken: string, id:string){
        let user = await userRepository.getUserById(id);
        if(!user){
            throw new Error("User not found");
        }
        if(user.refreshToken !== refreshToken){
            throw new Error("Refresh Token not match");
        }
        let token = jwt.sign({id: user.id}, config.jwt.secret as string, {expiresIn: config.jwt.accessTokenExpires});
        let newRefreshToken = jwt.sign({id: user.id}, config.jwt.secret as string, {expiresIn:  config.jwt.refreshTokenExpires});
        await authRepository.updateRefreshToken(user.id, newRefreshToken);
        return {
            status: "success",
            message: "Refresh Token Success",
            data: {
                token,
                refreshToken: newRefreshToken,
            }
        }
    }

    async logout(id: string){
        await authRepository.updateRefreshToken(id, null);
        return {
            status: "success",
            message: "Logout Successfully",
        }
    }
}


export default new AuthService();
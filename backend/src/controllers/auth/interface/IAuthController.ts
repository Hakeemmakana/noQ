import { NextFunction,Request,Response } from "express";

export default interface IAuthController{
    register(req:Request,Res:Response,next:NextFunction):Promise<void>;
    login(req:Request,Res:Response,next:NextFunction):Promise<void>;
    verifyOtp(req:Request,Res:Response,next:NextFunction):Promise<void>;
    logOut(req:Request,Res:Response,next:NextFunction):Promise<void>;
    forgotPassword(req:Request,Res:Response,next:NextFunction):Promise<void>;
    resendOtp(req:Request,Res:Response,next:NextFunction):Promise<void>;
}
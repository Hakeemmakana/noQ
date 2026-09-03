import { NextFunction, Request, Response } from "express";

export default interface IStaffAuthController{
    login(req:Request,res:Response,next:NextFunction):Promise<void>
    logout(req:Request,res:Response,next:NextFunction):Promise<void>
    staffRefreshToken(req:Request,res:Response,next:NextFunction):Promise<void>;
    
}
import { NextFunction, Request, Response } from "express";

export default interface IAdminAuthController{
    login(req:Request,res:Response,next:NextFunction):Promise<void>
    logout(req:Request,res:Response,next:NextFunction):Promise<void>
    adminRefreshToken(req:Request,res:Response,next:NextFunction):Promise<void>;
    
}
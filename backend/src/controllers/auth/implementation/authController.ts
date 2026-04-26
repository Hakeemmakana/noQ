import { NextFunction,Request,Response } from "express";
import IAuthController from "../interface/IAuthController";
import { validateRegister } from "../../../validation/authValidation";
import HttpStatus from "../../../constants/httpStatusCode";
import { AppError } from "../../../middleware/errorHandler";
import { IAuthService } from "../../../services/auth/interface/IAuthService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { emailRegex } from "../../../constants/regex";
import { INVALID_EMAIL, LOGGED_OUT_MESSAGE } from "../../../constants/messages";
import strict from "node:assert/strict";

@injectable()
export class AuthController implements IAuthController{
    constructor(@inject(TYPES.AuthService) private _authService:IAuthService){}
    register=async (req: Request, res: Response,next:NextFunction):Promise<void> =>  {
        try {
            const parsed=validateRegister(req.body)

            if(!parsed.isValid){
                throw new AppError('validation Failed',HttpStatus.BAD_REQUEST,parsed.errors)
            }
            const {name,email,phone,password}=parsed.data
            const {message}=await this._authService.register(name,email,phone,password)
            res.status(HttpStatus.OK).json({message})
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    verifyOtp=async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        try {
            const {email,otp,purpose}=req.body
            const {message,userId}=await this._authService.verifyOtp(email.trim(),otp.trim(),purpose)
        } catch (error) {
            next(error)
        }
    }
    async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('refresh_token',{
                httpOnly:true,
                secure:false,
                sameSite:'strict'
            });
            res.status(HttpStatus.OK).json({message:LOGGED_OUT_MESSAGEgit })
           
        } catch (error) {
            next(error)
        }
    }
    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             const email=req.body.email.trim();
            if(!email||!emailRegex.test(email)){
                throw new AppError(INVALID_EMAIL,HttpStatus.BAD_REQUEST);
            }
            const {status,message}=await this._authService.forgetPassword(email);
            res.status(status).json({message:message});
        } catch (error) {
            
        }
    }
    async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    

}
import { NextFunction,Request,Response } from "express";
import IAuthController from "../interface/IAuthController";
import { validateRegister } from "../../../validation/authValidation";
import HttpStatus from "../../../constants/httpStatusCode";
import { AppError } from "../../../middleware/errorHandler";
import { IAuthService } from "../../../services/auth/interface/IAuthService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";

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
            // console.log(req.body)
            const {email,otp,purpose}=req.body
            console.log(this)
            const {message,userId}=await this._authService.verifyOtp(email.trim(),otp.trim(),purpose)
            console.log(message,userId)
        } catch (error) {
            console.log(error)
        }
    }
    async logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    

}
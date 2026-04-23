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
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, Res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async verifyOtp(req: Request, Res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async logOut(req: Request, Res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async forgotPassword(req: Request, Res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    async resendOtp(req: Request, Res: Response, next: NextFunction): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
    

}
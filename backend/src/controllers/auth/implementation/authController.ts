import { NextFunction,Request,Response } from "express";
import IAuthController from "../interface/IAuthController";

export class AuthController implements IAuthController{
    constructor(){

    }
    async register(req: Request, Res: Response, next: NextFunction): Promise<void>  {
        try {
            
        } catch (error) {
            
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
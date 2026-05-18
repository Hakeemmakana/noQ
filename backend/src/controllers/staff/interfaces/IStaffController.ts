import { NextFunction, Request, Response } from "express";

export interface IStaffController{
    createStaff(req:Request,res:Response,next:NextFunction):Promise<void>;
    getAllStaff(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateStaff(req:Request,res:Response,next:NextFunction):Promise<void>;
    deleteStaff(req:Request,res:Response,next:NextFunction):Promise<void>;
    statusChangeStaff(req:Request,res:Response,next:NextFunction):Promise<void>;
}
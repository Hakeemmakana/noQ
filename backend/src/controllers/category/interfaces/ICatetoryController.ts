import { NextFunction, Request,Response } from "express";

export interface ICategoryController{
    getAllCategory(req:Request,res:Response,next:NextFunction):Promise<void>;
    getAllCategoryForUser(req:Request,res:Response,next:NextFunction):Promise<void>;
    createCategory(req:Request,res:Response,next:NextFunction):Promise<void>;
    statusChangeCategory(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateCategory(req:Request,res:Response,next:NextFunction):Promise<void>;
    deleteCategory(req:Request,res:Response,next:NextFunction):Promise<void>;
}
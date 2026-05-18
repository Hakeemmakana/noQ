import { NextFunction, Request, Response } from "express";

export interface ITableController{
    createTable(req:Request,res:Response,next:NextFunction):Promise<void>;
    getAllTable(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateTable(req:Request,res:Response,next:NextFunction):Promise<void>;
    deleteTable(req:Request,res:Response,next:NextFunction):Promise<void>;
    statusChangeTable(req:Request,res:Response,next:NextFunction):Promise<void>;
    getTable(req:Request,res:Response,next:NextFunction):Promise<void>;
}
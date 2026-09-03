import { NextFunction, Request,Response } from "express";

export default interface IReportController{
    getDashboard(req:Request,res:Response,next:NextFunction):Promise<void>
    getPdfReport(req:Request,res:Response,next:NextFunction):Promise<void>
    getCsvReport(req:Request,res:Response,next:NextFunction):Promise<void>
}
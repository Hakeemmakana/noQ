import { NextFunction, Request, Response } from "express";

export default interface IOrderController{
    getAllOrders(req:Request,res:Response,next:NextFunction):Promise<void>
    getAllAdminOrders(req:Request,res:Response,next:NextFunction):Promise<void>
    getOneOrder(req:Request,res:Response,next:NextFunction):Promise<void>
}
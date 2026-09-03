import { NextFunction, Request ,Response} from "express";

export interface INotificationController{
    getUserNotification(req:Request,res:Response,next:NextFunction):Promise<void>
    getChefNotification(req:Request,res:Response,next:NextFunction):Promise<void>
    getWaiterNotification(req:Request,res:Response,next:NextFunction):Promise<void>
    markNotificationAsRead(req:Request,res:Response,next:NextFunction):Promise<void>
    markNotificationAsAllRead(req:Request,res:Response,next:NextFunction):Promise<void>
    markNotificationAsAllReadUser(req:Request,res:Response,next:NextFunction):Promise<void>
}
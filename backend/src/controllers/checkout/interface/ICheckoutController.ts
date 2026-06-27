import { NextFunction, Response,Request } from "express";
import { AuthRequest } from "../../../middleware/jwt";

export default interface ICheckoutController{
    getCheckout(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
    createOrder(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
    paymentWebhook(req:Request,res:Response,next:NextFunction):Promise<void>
}
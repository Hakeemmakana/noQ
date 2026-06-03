import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../middleware/jwt";

export default interface ICartController{
    getCart(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
    getCartWithProduct(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
    addToCart(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
    removeFromCart(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
    deleteProductFromCart(req:AuthRequest,res:Response,next:NextFunction):Promise<void>
}
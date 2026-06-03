import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import ICartService from "../../../services/cart/interface/ICartService";
import ICartController from "../interface/ICartController";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../middleware/jwt";
import { AppError } from "../../../middleware/errorHandler";
import { CART_ADD_SUCCESS, CART_FETCH_FAILED, CART_FETCH_SUCCESS, CART_REMOVE_SUCCESS, PRODUCT_ID_REQUIRED } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
@injectable()
export default class cartController implements ICartController {
    constructor(@inject(TYPES.CartService) private _cartService: ICartService) { }
    addToCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            console.log(req.body)
            const { itemId } = req.body
            console.log(itemId,'userrrrrr')
            if (!itemId) {
                throw new AppError(PRODUCT_ID_REQUIRED, HttpStatus.BAD_REQUEST)
            }

            await this._cartService.addToCart(userId!, hotelId!, itemId)
            res.status(HttpStatus.OK).json({ message: CART_ADD_SUCCESS })
        } catch (error) {
            next(error)
        }

    }
    removeFromCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const itemId  = req.params.id
            if (!itemId) {
                throw new AppError(PRODUCT_ID_REQUIRED, HttpStatus.BAD_REQUEST)
            }
            await this._cartService.removeFromCart(userId!, hotelId!, itemId as string)
            res.status(HttpStatus.OK).json({ message: CART_REMOVE_SUCCESS })
        } catch (error) {
            next(error)
        }
    }
    deleteProductFromCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const itemId  = req.params.id
            if (!itemId) {
                throw new AppError(PRODUCT_ID_REQUIRED, HttpStatus.BAD_REQUEST)
            }
            await this._cartService.delteProductFromCart(userId!, hotelId!, itemId as string)
            res.status(HttpStatus.OK).json({ message: CART_REMOVE_SUCCESS })
        } catch (error) {
            next(error)
        }
    }
    getCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const cartData=await this._cartService.getCart(userId!,hotelId!)
            if(!cartData){
                res.status(HttpStatus.OK).json({ message: CART_FETCH_FAILED })
                return;
                
            }
            res.status(HttpStatus.OK).json({ message: CART_FETCH_SUCCESS ,cartData})
            
        } catch (error) {
            next(error)
        }
    }
    getCartWithProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const cartData=await this._cartService.getCartWithProduct(userId!,hotelId!)
            if(!cartData){
                res.status(HttpStatus.OK).json({ message: CART_FETCH_FAILED })
                return;
                
            }
            res.status(HttpStatus.OK).json({ message: CART_FETCH_SUCCESS ,cartData})
            
        } catch (error) {
            next(error)
        }
    }
}
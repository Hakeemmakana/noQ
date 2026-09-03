import { Response, NextFunction, Request } from "express";
import { AuthRequest } from "../../../middleware/jwt";
import ICheckoutController from "../interface/ICheckoutController";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import ICheckoutService from "../../../services/chekout/interface/ICheckoutService";
import HttpStatus from "../../../constants/httpStatusCode";
import { apiResponse } from "../../../utils/apiResponse";
import { toPostReqDto } from "../../../dtos/checkout/checkout.reqDto";
import { AppError } from "../../../middleware/errorHandler";
import { HOTEL_ID_NOT_FOUND } from "../../../constants/messages";
@injectable()
export default class checkoutController implements ICheckoutController {
    constructor(@inject(TYPES.CheckoutService) private _checkoutService: ICheckoutService) { }
    getCheckout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const data = await this._checkoutService.getCheckout(userId!, hotelId!)
            apiResponse(res, HttpStatus.OK, 'checkout fetch successfully', data)
        } catch (error) {
            next(error)
        }
    }

    createOrder = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const data = toPostReqDto(req.body)
            const order = await this._checkoutService.createOrder(userId!, hotelId!, data)
            apiResponse(res, HttpStatus.OK, order.type, order.payload)
        } catch (error) {
            next(error)
        }

    }
    paymentWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const signature = req.headers['stripe-signature'];
            await this._checkoutService.stipeWebhook(req.body, signature as string)

        } catch (error) {
            next(error)
        }
    }
    remainingPayment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            if(!userId||!hotelId){
                throw new AppError(HOTEL_ID_NOT_FOUND,HttpStatus.NOT_FOUND)
            }
            const resData=await this._checkoutService.remainingPayment(userId,hotelId)
            apiResponse(res, HttpStatus.OK,'success', resData)

        } catch (error) {
            next(error)
        }
    }

}
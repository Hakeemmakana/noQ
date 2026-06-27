import { inject, injectable } from "inversify";
import IOrderController from "../interface/IOrderController";
import { TYPES } from "../../../DI/types";
import IOrderService from "../../../services/order/interface/IOrderService";
import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../middleware/jwt";
import { apiResponse } from "../../../utils/apiResponse";
import HttpStatus from "../../../constants/httpStatusCode";
import { ORDER_FETCH_SUCCESS } from "../../../constants/messages";
import { AppError } from "../../../middleware/errorHandler";
@injectable()
export default class OrderController implements IOrderController {
    constructor(@inject(TYPES.OrderService) private _orderService: IOrderService) { }
    getAllOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id
            const hotelId = req.hotelId
            const data = await this._orderService.getAllOrders(userId!, hotelId!)
            apiResponse(res, HttpStatus.OK, ORDER_FETCH_SUCCESS, data)
        } catch (error) {
            next(error)
        }

    }
    getAllAdminOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const hotelId = req.admin?.id
            const data = await this._orderService.getAllAdminOrders(hotelId!, req.query.search as string, Number(req.query.page))
            apiResponse(res, HttpStatus.OK, ORDER_FETCH_SUCCESS, data)
        } catch (error) {
            next(error)
        }

    }
    getOneOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const orderId = req.params?.id
            if (!orderId) {
                throw new AppError('orderId is missing', HttpStatus.NOT_FOUND)
            }
            const data = await this._orderService.getOneOrder(orderId as string)
            apiResponse(res, HttpStatus.OK, ORDER_FETCH_SUCCESS, data)
        } catch (error) {
            next(error)
        }
    }
}
import { inject, injectable } from "inversify";
import IOrderService from "../interface/IOrderService";
import { TYPES } from "../../../DI/types";
import IOrderRepository from "../../../repositories/order/interface/IOrderRepository";
import { IOrderResDto, IPaginatedOrderData, toOrderDto, toOrderDtos, toPaginatedOrderDtos } from "../../../dtos/order/orderResDto";
import { AppError } from "../../../middleware/errorHandler";
import { ORDER_NOT_FOUND } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
@injectable()
export default class OrderService implements IOrderService {
    constructor(@inject(TYPES.OrderRepository) private _orderRepository: IOrderRepository) { }
    getAllOrders = async (userId: string, hotelId: string): Promise<IOrderResDto[] | null> => {
        const data = await this._orderRepository.getAllOrders(userId, hotelId)
        if (!data) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const orderDto = toOrderDtos(data)
        return orderDto
    }
    getAllAdminOrders = async (hotelId: string, search: string, page: number): Promise<IPaginatedOrderData<IOrderResDto> | null> => {
        const limit = 8
        const data = await this._orderRepository.getAllAdminOrders(hotelId, search, page, limit)
        if (!data) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const orderDto = toPaginatedOrderDtos(data)
        return orderDto
    }
    getOneOrder = async (orderId: string): Promise<IOrderResDto | null> => {
        const data = await this._orderRepository.getOneOrder(orderId)
        if (!data) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const orderDto = toOrderDto(data)
        return orderDto
    }
}
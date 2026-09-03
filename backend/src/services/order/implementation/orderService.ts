import { inject, injectable } from "inversify";
import IOrderService from "../interface/IOrderService";
import { TYPES } from "../../../DI/types";
import IOrderRepository from "../../../repositories/order/interface/IOrderRepository";
import { IOrderResDto, IPaginatedOrderData, toDtoItemsArr, toOrderDto, toOrderDtos, toPaginatedOrderDtos } from "../../../dtos/order/orderResDto";
import { AppError } from "../../../middleware/errorHandler";
import { CHEF_HOTEL_MISMATCH, CHEF_ID_NOT_FOUND, HOTEL_ID_NOT_FOUND, ORDER_NOT_FOUND } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import IOrderItemRepository from "../../../repositories/orderItems/interfaces/IOrderItemRepository";
import { IOrderResForStaffDto, toStaffOrderDto, toStaffOrderWithPagiDto } from "../../../dtos/order/orderResforstaffDto";
import { IOrderItem, OrderItemStatus } from "../../../models/orderItems";
import { GetWaiterOrdersQueryDTO, mapCompleateOrderFilterQuery } from "../../../dtos/order/orderReqDto";
import ISocketService from "../../soketService/interface/ISocketService";
import INotificationService from "../../notificationService/interface/INotifactionService";
import { IOrder } from "../../../models/order";
@injectable()
export default class OrderService implements IOrderService {
    constructor(@inject(TYPES.OrderRepository) private _orderRepository: IOrderRepository,
        @inject(TYPES.OrderItemRepository) private _orderItemRepository: IOrderItemRepository,
        @inject(TYPES.SocketService) private _socketService: ISocketService,
    @inject(TYPES.NotificationService) private _notificationService:INotificationService) { }
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
        const orderItems = await this._orderItemRepository.getOrders(orderId)
        if (!data || !orderItems) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const orderDto = toOrderDto(data)
        const orderItemDto = toDtoItemsArr(orderItems)
        return { ...orderDto, orderItems: orderItemDto }
    }

    // cheff
    getNewOrders = async (hotelId: string): Promise<IOrderResForStaffDto[]> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const res = await this._orderItemRepository.getNewOrderChef(hotelId,)
        const resDto = toStaffOrderDto(res)
        return resDto

    }
    getAccpetedOrders = async (hotelId: string, chefId: string): Promise<IOrderResForStaffDto[]> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!chefId) {
            throw new AppError(CHEF_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const res = await this._orderItemRepository.getOrdersChef(hotelId, OrderItemStatus.PREPARING, chefId)
        const resDto = toStaffOrderDto(res)
        return resDto

    }
    getReadyOrders = async (hotelId: string, chefId: string): Promise<IOrderResForStaffDto[]> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!chefId) {
            throw new AppError(CHEF_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const res = await this._orderItemRepository.getOrdersChef(hotelId, OrderItemStatus.READY_TO_SERVE, chefId)
        const resDto = toStaffOrderDto(res)
        return resDto
    }

    accpetOrder = async (hotelId: string, orderId: string, chefId: string): Promise<IOrderItem> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!orderId) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const order = await this._orderItemRepository.getOrderItemById(orderId)
        if (order?.hotelId?.toString() !== hotelId) {
            throw new AppError(CHEF_HOTEL_MISMATCH, HttpStatus.NOT_FOUND)
        }
        await this._orderItemRepository.updateOrderItemStatusByChef(orderId, OrderItemStatus.PREPARING, chefId)
        await this._notificationService.InPreperateion(hotelId,orderId)
        return order

    }
    markOrderReady = async (hotelId: string, orderId: string, chefId: string): Promise<IOrderItem> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!orderId) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const order = await this._orderItemRepository.getOrderItemById(orderId)
        if (order?.chefId?.toString() !== chefId) {
            throw new AppError(CHEF_HOTEL_MISMATCH, HttpStatus.NOT_FOUND)
        }
         await this._orderItemRepository.updateOrderItemStatusByChef(orderId, OrderItemStatus.READY_TO_SERVE)
        await this._notificationService.readyToServe(hotelId,orderId)
        return order
    }
    getwithoutCompleteOrderWaiter = async (hotelId: string, page: number): Promise<IPaginatedOrderData<IOrderResForStaffDto>> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const limit = 8
        const res = await this._orderItemRepository.getOrderWithoutCompleate(hotelId, page, limit)
        const resDto = toStaffOrderWithPagiDto(res)
        return resDto
    }
    getQuickOrderWaiter = async (hotelId: string): Promise<IOrderResForStaffDto[]> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const res = await this._orderItemRepository.getQuickOrderWaiter(hotelId)
        const resDto = toStaffOrderDto(res)
        return resDto

    }
    markOrderCompleated = async (hotelId: string, orderId: string, waiterId: string): Promise<IOrderItem> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!orderId) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const order = await this._orderItemRepository.getOrderItemById(orderId)
        if (!order || order?.waiterId) {
            if (order?.waiterId?.toString() !== waiterId) {
                throw new AppError(CHEF_HOTEL_MISMATCH, HttpStatus.NOT_FOUND)
            }
        }

         await this._orderItemRepository.updateOrderItemStatusByWaiter(orderId, OrderItemStatus.COMPLETED, waiterId)
        await this._notificationService.compleated(hotelId,orderId)
        return order
    }
    getCompleteOrderWaiter = async (hotelId: string, waiterId: string, query: GetWaiterOrdersQueryDTO): Promise<IPaginatedOrderData<IOrderResForStaffDto>> => {
        const queryDto = mapCompleateOrderFilterQuery(query)
        const limit = 8
        const res = await this._orderItemRepository.getOrderCompleateWaiter(hotelId, waiterId, limit, queryDto)
        const resDto = toStaffOrderWithPagiDto(res)
        return resDto
    }
    getCompletedOrders = async (hotelId: string, chefId: string, query: GetWaiterOrdersQueryDTO): Promise<IPaginatedOrderData<IOrderResForStaffDto>> => {
        // if (!hotelId) {
        //     throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        // }
        // if (!chefId) {
        //     throw new AppError(CHEF_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        // }
        // const res = await this._orderItemRepository.getOrdersChef(hotelId, OrderItemStatus.COMPLETED, chefId)
        // const resDto = toStaffOrderDto(res)
        // return resDto
        const queryDto = mapCompleateOrderFilterQuery(query)
        const limit = 8
        const res = await this._orderItemRepository.getCompleateOrdersChef(hotelId, chefId, limit, queryDto)
        const resDto = toStaffOrderWithPagiDto(res)
        return resDto
    }
    getReadyToServeOrders = async (hotelId: string, waiterId: string): Promise<IOrderResForStaffDto[]> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!waiterId) {
            throw new AppError(CHEF_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const res = await this._orderItemRepository.getOrdersWaiter(hotelId, OrderItemStatus.READY_TO_SERVE,)
        const resDto = toStaffOrderDto(res)
        return resDto

    }
    getPickedOrders = async (hotelId: string, waiterId: string): Promise<IOrderResForStaffDto[]> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!waiterId) {
            throw new AppError(CHEF_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const res = await this._orderItemRepository.getOrdersWaiter(hotelId, OrderItemStatus.PICKED, waiterId)
        const resDto = toStaffOrderDto(res)
        return resDto

    }
    markOrderPicked = async (hotelId: string, orderId: string, waiterId: string): Promise<IOrderItem> => {
        if (!hotelId) {
            throw new AppError(HOTEL_ID_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!orderId) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const order = await this._orderItemRepository.getOrderItemById(orderId)
        if (!order || order?.waiterId) {
            if (order?.waiterId?.toString() !== waiterId) {
                throw new AppError(CHEF_HOTEL_MISMATCH, HttpStatus.NOT_FOUND)
            }
        }
        await this._orderItemRepository.updateOrderItemStatusByWaiter(orderId, OrderItemStatus.PICKED, waiterId)
        await this._notificationService.picked(hotelId,orderId)
        return order
    }
    markMainOrderCompleted=async(hotelId: string, orderId: string): Promise<IOrder|null>=> {
        const order=await this._orderRepository.getOneOrder(orderId)
        if(order?.hotelId.toString()==hotelId){
            throw new AppError(HOTEL_ID_NOT_FOUND,HttpStatus.NOT_FOUND)
        }
        
        const res=await this._orderRepository.markOrderAsCompleted(orderId)
        return res
    }
    

}
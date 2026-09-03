import { injectable, inject } from "inversify";
import ISocketService from "../../soketService/interface/ISocketService";
import INotificationService from "../interface/INotifactionService";
import { TYPES } from "../../../DI/types";
import IOrderItemRepository from "../../../repositories/orderItems/interfaces/IOrderItemRepository";
import IOrderRepository from "../../../repositories/order/interface/IOrderRepository";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { INotiData } from "../../../repositories/notification/implementation/notificationRepository";
import { INotificationRepository } from "../../../repositories/notification/interface/INotificationRepository";
import { INotification } from "../../../models/notification";
import { IOrderItem } from "../../../models/orderItems";
import {  toStaffOrderDto } from "../../../dtos/order/orderResforstaffDto";


@injectable()
export default class NotificationService implements INotificationService {
    constructor(
        @inject(TYPES.NotificationRepository) private _notificationRepo: INotificationRepository,
        @inject(TYPES.SocketService) private _socketService: ISocketService,
        @inject(TYPES.OrderItemRepository) private _orderItemRepository: IOrderItemRepository,
        @inject(TYPES.OrderRepository) private _orderRepository: IOrderRepository,
        @inject(TYPES.MenuItemRepository) private _menuItemRepository: IMenuRepository
    ) { }

    NewOrder = async (orderItems: IOrderItem[]): Promise<void> => {
        const mainOrder = await this._orderRepository.getOneOrder(orderItems[0].orderId.toString())
        const userId = mainOrder?.userId.toString()
        await Promise.all(orderItems.map(async item => {
            const product = await this._menuItemRepository.getMenuItemById(item?.productId?.toString())

            const isKitchen = product?.type === 'kitchen'
            const chefMessage = `new order ${product?.itemName} *${item.quantity}`
            
            const data: INotiData = {
                title: 'New order',
                message: chefMessage,
                isRead: false,
                recipientType: isKitchen ? 'CHEF' : 'WAITER',
                hotelId: item.hotelId.toString(),
                userId: userId
            }
            const notData = await this._notificationRepo.createNotification(data)
            if (isKitchen) {
                this._socketService.sendNotificationToChef(item.hotelId.toString(), notData)
            } else {
                this._socketService.sendNotificationToWaiter(item.hotelId.toString(), notData)
            }
        }))
        const userMessage = ` order created by ${orderItems.length} items`
        const userData: INotiData = {
            title: 'New created',
            message: userMessage,
            isRead: false,
            recipientType: 'USER',
            hotelId: mainOrder?.hotelId?.toString(),
            userId: userId
        }
        const createdUserData=await this._notificationRepo.createNotification(userData)
        this._socketService.sendNotificationToUser(userId!, createdUserData)
    }
    InPreperateion = async (hotelId: string, orderItemId: string): Promise<void> => {
        const order = await this._orderItemRepository.getOrderItemById(orderItemId)
        const mainOrder = await this._orderRepository.getOneOrder(order?.orderId?.toString() as string)
        const product = await this._menuItemRepository.getMenuItemById(order?.productId?.toString() as string)
        const userMessage = `Your order ${product?.itemName}*${order?.quantity} preparing`
        const userId = mainOrder?.userId?.toString()
        const data: INotiData = {
            title: 'Order preparing',
            message: userMessage,
            isRead: false,
            recipientType: 'USER',
            hotelId: hotelId,
            userId: userId
        }
        const createdUserNotification=await this._notificationRepo.createNotification(data)
        const updateCardData = {
            _id: String(order?._id),
            status: order?.status ?? ''
        }
        this._socketService.updateCardItemForUser(hotelId, String(mainOrder?._id), updateCardData)
        this._socketService.sendNotificationToUser(userId!, createdUserNotification)
        
    }
    readyToServe = async (hotelId: string, orderItemId: string): Promise<void> => {
        const order = await this._orderItemRepository.getOrderItemById(orderItemId)
        const mainOrder = await this._orderRepository.getOneOrder(order?.orderId?._id?.toString() as string)
        const product = await this._menuItemRepository.getMenuItemById(order?.productId?.toString() as string)
        const userMessage = `Your order ${product?.itemName}*${order?.quantity} ready to serve`
        const waiterMessage = `orderId ${orderItemId.slice(0, 5)} is ready `
        const userId=mainOrder?.userId.toString()
        const userData: INotiData = {
            title: 'Order ready',
            message: userMessage,
            isRead: false,
            recipientType: 'USER',
            hotelId: hotelId,
            userId:userId
        }
        const waiterData: INotiData = {
            title: 'Order ready',
            message: waiterMessage,
            isRead: false,
            recipientType: 'WAITER',
            hotelId: hotelId,
            userId: userId
        }
        
        const createdUserNotification=await this._notificationRepo.createNotification(userData)
        const createdWaiterNotification=await this._notificationRepo.createNotification(waiterData)

        this._socketService.sendNotificationToUser(userId!, createdUserNotification)
        this._socketService.sendNotificationToWaiter(hotelId, createdWaiterNotification)
        const updateCardData = {
            _id: String(order?._id),
            status: order?.status ?? ''
        }
        this._socketService.updateCardItemForUser(hotelId, String(mainOrder?._id), updateCardData)
        const orderForDto=await this._orderItemRepository.getOrdersByIdForNotification(orderItemId)
        if (orderForDto) {
            const dtoOrder = toStaffOrderDto(orderForDto)
            this._socketService.updateCardForWaiter(hotelId, dtoOrder)
        }
        
    }
    picked = async (hotelId: string, orderItemId: string): Promise<void> => {
        const order = await this._orderItemRepository.getOrderItemById(orderItemId)
        const mainOrder = await this._orderRepository.getOneOrder(order?.orderId?._id?.toString() as string)
        const product = await this._menuItemRepository.getMenuItemById(order?.productId?.toString() as string)
        const userMessage = `Your order ${product?.itemName}*${order?.quantity} waiter picked`
        const userId=mainOrder?.userId.toString()
        const data: INotiData = {
            title: 'Order piked',
            message: userMessage,
            isRead: false,
            recipientType: 'USER',
            hotelId: hotelId,
            userId: userId
        }
        const createdUserNotification=await this._notificationRepo.createNotification(data)
        this._socketService.sendNotificationToUser(userId!, createdUserNotification)
        
        const updateCardData = {
            _id: String(order?._id),
            status: order?.status ?? ''
        }
        this._socketService.updateCardItemForUser(hotelId, String(mainOrder?._id), updateCardData)
        
    }
    compleated = async (hotelId: string, orderItemId: string): Promise<void> => {
        const order = await this._orderItemRepository.getOrderItemById(orderItemId)
        const mainOrder = await this._orderRepository.getOneOrder(order?.orderId._id?.toString() as string)
        const product = await this._menuItemRepository.getMenuItemById(order?.productId?.toString() as string)
        const userMessage = `Your order ${product?.itemName}*${order?.quantity} completed`
        const userId= mainOrder?.userId.toString()
        const data: INotiData = {
            title: 'Order compleated',
            message: userMessage,
            isRead: false,
            recipientType: 'USER',
            hotelId: hotelId,
            userId:userId
        }
        const createdUserNotification=await this._notificationRepo.createNotification(data)
        this._socketService.sendNotificationToUser(userId!, createdUserNotification)
        const updateCardData = {
            _id: String(order?._id),
            status: order?.status ?? ''
        }
        this._socketService.updateCardItemForUser(hotelId, String(mainOrder?._id), updateCardData)
        
    }
    getChefNotification = async (hotelId: string): Promise<INotification[]> => {

        return await this._notificationRepo.getNotificationByChef(hotelId)
    }
    getUserNotification = async (userId: string): Promise<INotification[]> => {
        return await this._notificationRepo.getNotificationByUser(userId)

    }
    getWaiterNotification = async (hotelId: string): Promise<INotification[]> => {
        return await this._notificationRepo.getNotificationByWaiter(hotelId)

    }
    markNotificationAsRead = async (notId: string): Promise<INotification | null> => {
        return await this._notificationRepo.markNotificationAsRead(notId)
    }
    markNotificationAsAllRead = async (hotelId: string, staffType: string): Promise<INotification[] | null> => {
        return await this._notificationRepo.markNotificationAsAllRead(hotelId, staffType)

    }
    markNotificationAsAllReadUser = async (userId: string, ): Promise<INotification[] | null> => {
        return await this._notificationRepo.markNotificationAsAllReadUser(userId)

    }
}

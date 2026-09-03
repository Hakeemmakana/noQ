
import { Server as HttpServer } from "http";
import { INotiData } from "../../../repositories/notification/implementation/notificationRepository";
import { IOrderResForStaffDto } from "../../../dtos/order/orderResforstaffDto";
export default interface ISocketService {
    initSocket(httpServer: HttpServer): void;
    sendNotificationToUser(userId: string, data: INotiData): void;
    sendNotificationToChef(hotelId: string, data:INotiData): void;
    sendNotificationToWaiter(hotelId: string,data:INotiData): void;
    updateCardItemForUser(hotelId: string,orderId:string,data:{_id: string, status:string}): void;
    updateCardForWaiter(hotelId: string,  cardData: IOrderResForStaffDto[]): void;
    updateCardForChef(hotelId: string, cardData: IOrderResForStaffDto): void;
}
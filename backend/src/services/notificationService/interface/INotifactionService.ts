// export default interface INotificationService {
//     saveAndSendUserNotification(userId: string, message: string): Promise<any>;
//     saveAndSendChefNotification(hotelId: string, message: string): Promise<any>;
//     saveAndSendWaiterNotification(hotelId: string, message: string): Promise<any>;

import { INotification } from "../../../models/notification";
import { IOrderItem } from "../../../models/orderItems";

// }
export default interface INotificationService {
    NewOrder(orderItems:IOrderItem[]): Promise<void>;
    InPreperateion(hotelId: string, orderItemId: string): Promise<void>;
    readyToServe(hotelId: string, orderItemId: string): Promise<void>;
    picked(hotelId: string, orderItemId: string): Promise<void>;
    compleated(hotelId: string, orderItemId: string): Promise<void>;

    getUserNotification(userId: string): Promise<INotification[]>
    getWaiterNotification(hotelId: string): Promise<INotification[]>
    getChefNotification(hotelId: string): Promise<INotification[]>

    markNotificationAsRead(notId:string): Promise<INotification|null>
    markNotificationAsAllRead(hotelId:string,staffType:string): Promise<INotification[]|null>
    markNotificationAsAllReadUser(userId:string): Promise<INotification[]|null>

}
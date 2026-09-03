import { INotification } from "../../../models/notification";

export interface INotificationRepository {
    createNotification(data: {
        userId?: string;
        hotelId?: string;
        message: string;
        recipientType: "USER" | "CHEF" | "WAITER";
        isRead: boolean;
    }): Promise<INotification>;

    // getNotificationByUserId(userId: string): Promise<any[]>;
    getNotificationByChef(hotelId: string): Promise<INotification[]>;
    getNotificationByWaiter(hotelId: string): Promise<INotification[]>;
    getNotificationByUser(userId: string): Promise<INotification[]>;
    markNotificationAsAllRead(hotelId: string,staffType:string): Promise<INotification[]|null>;
    markNotificationAsAllReadUser(userId: string): Promise<INotification[]|null>;
    markNotificationAsRead(notId: string): Promise<INotification|null>;
}
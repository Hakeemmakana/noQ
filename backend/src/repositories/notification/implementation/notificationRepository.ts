import { injectable } from "inversify";
import { INotificationRepository } from "../interface/INotificationRepository";

import { BaseRepository } from "../../IBaseRepository";
import Notification, { INotification } from "../../../models/notification";
export interface INotiData {
        userId?: string;
        hotelId?: string;
        title:string;
        message: string;
        recipientType: "USER" | "CHEF" | "WAITER";
        isRead: boolean;
    }
@injectable()
export default class NotificationRepository extends BaseRepository<INotification> implements INotificationRepository {
    constructor(){
        super(Notification)
    }
    
     async createNotification(data:INotiData ): Promise<INotification> {
            const newNotification = await this.create(data);
            return newNotification
    }

    


     async getNotificationByChef(hotelId: string): Promise<INotification[]> {
        const filter={
            hotelId:hotelId,
            recipientType:'CHEF',
            isRead:false
        }
       
        return await this.getAll(filter)
    }

     async getNotificationByWaiter(hotelId: string): Promise<INotification[]> {
        const filter={
            hotelId:hotelId,
            recipientType:'WAITER',
            isRead:false
        }
        return await this.getAll(filter)
    }
     async getNotificationByUser(userId: string): Promise<INotification[]> {
        const filter={
            userId:userId,
            recipientType:'USER',
            isRead:false
        }
        return await this.getAll(filter)
    }
    async markNotificationAsRead(notId: string): Promise<INotification|null> {
        return await this.updateById(notId,{isRead:true})
    }
    async markNotificationAsAllRead(hotelId: string, staffType: string): Promise<INotification[]|null> {
        const query={
            hotelId:hotelId,
            recipientType:staffType==='chef'?'CHEF':'WAITER'
        }
         await this.model.updateMany(query,{isRead:true})
         return await this.getAll(query)
        }
        async markNotificationAsAllReadUser(userId: string): Promise<INotification[] | null> {
            const query={
                userId:userId,
                recipientType:'USER'
            }
            await this.model.updateMany(query,{isRead:true})
            return await this.getAll(query)
    }

}
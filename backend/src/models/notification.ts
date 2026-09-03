import { Schema, model,HydratedDocument } from "mongoose";
export interface INotification  {
    _id:Schema.Types.ObjectId;
    userId?: string;
    hotelId?: string;
    title:string
    message: string;
    recipientType: "USER" | "CHEF" | "WAITER";
    isRead: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
    {
        userId: {type: String,required: false},
        hotelId: {type: String,required: false,},
        title: {type: String,required: true},
        message: {type: String,required: true},
        recipientType: {type: String,enum: ["USER", "CHEF", "WAITER"],required: true},
        isRead: {type: Boolean,default: false }
    },{timestamps: true });
const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
export type NotificationDocument=HydratedDocument<INotification>
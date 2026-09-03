import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { HydratedDocument, Types } from "mongoose";
import { IHotelAdmin } from "./hotelAdmin";



export enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}




export interface IOrder {
    _id?:Types.ObjectId;
    orderId?:string;
    tableId: Types.ObjectId|string;
    userId: Types.ObjectId|string;
    hotelId: Types.ObjectId|string|IHotelAdmin
    totalAmount: number;
    prepaidAmount: number;
    payAmount: number;
    orderStatus: OrderStatus;
    totalItem:number;
}




const orderSchema = new Schema<IOrder>({
     orderId: {
        type: String,
        required: true,
        default: () =>
            `ORD-${uuidv4()
                .replace(/-/g, "")
                .substring(0, 8)
                .toUpperCase()}`
    },
    tableId: { type: Schema.Types.ObjectId, ref: "Table", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: "HotelAdmin", required: true },
    totalAmount: { type: Number, required: true },
    prepaidAmount: { type: Number, default: 0 },
    payAmount: { type: Number, required: true },
    totalItem:{type:Number,default:0},
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
}, { timestamps: true });
const Order = mongoose.model<IOrder>('Order', orderSchema)
export type OrderDocument = HydratedDocument<IOrder>;
export default Order
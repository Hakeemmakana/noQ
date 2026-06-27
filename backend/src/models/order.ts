import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { HydratedDocument, Types } from "mongoose";

export enum OrderItemStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    READY_TO_SERVE = "ready_to_serve",
    SERVED = "served",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export enum OrderStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}
export enum PaymentStatus{
    UNPAID='unpaid',
    PAID='paid'
}

export interface IOrderItem {
    productId: Types.ObjectId;
    price: number;
    quantity: number;
    total: number;
    status: OrderItemStatus;
    paymentId?:string;
    paymentStatus:PaymentStatus
}

export interface IOrder {
    _id?:Types.ObjectId;
    orderId?:string;
    tableId: Types.ObjectId|string;
    userId: Types.ObjectId|string;
    hotelId: Types.ObjectId|string;
    items: IOrderItem[];
    totalAmount: number;
    prepaidAmount: number;
    payAmount: number;
    orderStatus: OrderStatus;
}


const orderItemSchema = new Schema<IOrderItem>({
    productId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentId:{type:String,},
    status: { type: String, enum: Object.values(OrderItemStatus), default: OrderItemStatus.PENDING },
    paymentStatus:{type:String,enum:Object.values(PaymentStatus),default:PaymentStatus.UNPAID}
}, { _id: false });

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
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    prepaidAmount: { type: Number, default: 0 },
    payAmount: { type: Number, required: true },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
}, { timestamps: true });
const Order = mongoose.model<IOrder>('Order', orderSchema)
export type OrderDocument = HydratedDocument<IOrder>;
export default Order
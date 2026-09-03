import mongoose, { Schema } from "mongoose";
import { HydratedDocument, Types } from "mongoose";
import { IMenuItem } from "./menuItem";
export enum OrderItemStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    READY_TO_SERVE = "ready_to_serve",
    PICKED = "picked",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}
export enum PaymentStatus {
    UNPAID = 'unpaid',
    PAID = 'paid'
}

export interface IOrderItem {
    _id?:Types.ObjectId|string;
    // id?:Types.ObjectId|string;
    productId: Types.ObjectId|IMenuItem;
    variantId:Types.ObjectId;
    orderId:Types.ObjectId;
    hotelId:Types.ObjectId;
    price: number;
    quantity: number;
    total: number;
    status: OrderItemStatus;
    paymentId?: string;
    paymentStatus: PaymentStatus
    chefId?:Types.ObjectId;
    waiterId?:Types.ObjectId;
    updatedAt?:Date;
}


const orderItemSchema = new Schema<IOrderItem>({
    productId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
    variantId:{type: Schema.Types.ObjectId,required:true},
    hotelId:{type: Schema.Types.ObjectId, ref: "HotelAdmin", required: true },
    orderId:{type: Schema.Types.ObjectId, ref: "Order", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentId: { type: String, },
    status: { type: String, enum: Object.values(OrderItemStatus), default: OrderItemStatus.PENDING },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.UNPAID },
    chefId:{type:Schema.Types.ObjectId,ref:'Staff',default:null},
    waiterId:{type:Schema.Types.ObjectId,ref:'Staff',default:null}
}, { timestamps: true });
const OrderItem = mongoose.model<IOrderItem>('OrderItem', orderItemSchema)
export default OrderItem
export type OrderItemDocument=HydratedDocument<IOrderItem>
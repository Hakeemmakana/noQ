import { IMenuItem } from "../../models/menuItem";
import { IMenuVariant } from "../../models/menuVarient";
import { IOrderItem } from "../../models/orderItems";
import { IPaginatedOrderData } from "./orderResDto";

export interface IOrderResForStaffDto {
    _id: string;
    // table: string;
    status:string;
    // userName: string;
    product: string;
    productQuantity: number;
    time: string;
    orderId:Types.ObjectId

}
import {  Types } from "mongoose";
// import { IMenuItem } from "./menuItem";
export enum OrderItemStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    READY_TO_SERVE = "ready_to_serve",
    SERVED = "picked",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}
export enum PaymentStatus {
    UNPAID = 'unpaid',
    PAID = 'paid'
}

// type ITableId={_id:Types.ObjectId,tableNumber:string}
 interface IOrderStaffTemp {
    _id?:Types.ObjectId;
    orderId?:string;
    tableId: {_id:Types.ObjectId,tableNumber:string};
    userId: {_id:Types.ObjectId,name:string}
}
export interface IOrderItemStaff {
    _id?:Types.ObjectId|string;
    // id?:Types.ObjectId|string;
    productId: Types.ObjectId|IMenuItem;
    variantId:Types.ObjectId;
    orderId:IOrderStaffTemp
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



export function toStaffOrderWithPagiDto(orders: IPaginatedOrderData<IOrderItem>): IPaginatedOrderData<IOrderResForStaffDto> {
    const orderDataDto= orders.data.map(data => {
        const product = data.productId as IMenuItem
        const vairant = product.variants.filter(x =>
            x._id?.toString() == data?.variantId?.toString()) as IMenuVariant[]
        
        return {
            _id: data?._id!.toString(),
            status:data.status,
            orderId:data.orderId,
            // table:'tn2' ,
            // userName: 'hakem',
            product: `${product.itemName} ${vairant[0].name}`,
            productQuantity: data.quantity,
            time: new Date(data.updatedAt!).toLocaleTimeString()
        }
    })
    return {data:orderDataDto,
            limit:orders.limit,
            page:orders.page,
            total:orders.total

    }
}
export function toStaffOrderDto(orderItems: IOrderItem[]): IOrderResForStaffDto[] {
    return orderItems.map(data => {
        const product = data.productId as IMenuItem
        const vairant = product.variants.filter(x =>
            x._id?.toString() == data?.variantId?.toString()) as IMenuVariant[]
        return {
            _id: data?._id!.toString(),
            status:data.status,
            orderId:data.orderId,
            // table: 'teo',
            // userName: 'hakeem',
            product: `${product.itemName} ${vairant[0].name}`,
            productQuantity: data.quantity,
            time: new Date(data.updatedAt!).toLocaleTimeString()
        }
    })
}
export function toStaffOneOrderDto(orderItem: IOrderItem): IOrderResForStaffDto {
        const product = orderItem.productId as IMenuItem
        const vairant = product.variants.filter(x =>
            x._id?.toString() == orderItem?.variantId?.toString()) as IMenuVariant[]
        return {
            _id: orderItem?._id!.toString(),
            status:orderItem.status,
            orderId:orderItem.orderId,
            // table: 'teo',
            // userName: 'hakeem',
            product: `${product.itemName} ${vairant[0].name}`,
            productQuantity: orderItem.quantity,
            time: new Date(orderItem.updatedAt!).toLocaleTimeString()
        }
    
}

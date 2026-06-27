import { OrderStatus } from "aws-sdk/clients/outposts";
import { Types } from "mongoose";
import { IOrder, IOrderItem, OrderItemStatus, PaymentStatus } from "../../models/order";

export interface IPaginatedOrderData<T> {
    total: number;
    page: number;
    limit: number;
    data: T[]
}

interface IOrderItemDto {
    productId: Types.ObjectId;
    price: number;
    quantity: number;
    total: number;
    status: OrderItemStatus;
    paymentId?: string;
    paymentStatus: PaymentStatus
}



export interface IOrderResDto {
    _id?: Types.ObjectId;
    orderId?: string;
    tableId: Types.ObjectId | string;
    userId: Types.ObjectId | string;
    hotelId: Types.ObjectId | string;
    items: IOrderItemDto[];
    totalAmount: number;
    prepaidAmount: number;
    payAmount: number;
    orderStatus: OrderStatus;
}
function toDtoItems(data: IOrderItem): IOrderItemDto {
    return {
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
        paymentStatus: data.paymentStatus,
        status: data.status,
        total: data.total,
        paymentId: data.paymentId,
    }

}

export function toOrderDto(orderData: IOrder): IOrderResDto {
    return {
        _id: orderData._id,
        hotelId: orderData.hotelId,
        orderStatus: orderData.orderStatus,
        payAmount: orderData.payAmount,
        prepaidAmount: orderData.prepaidAmount,
        tableId: orderData.tableId,
        totalAmount: orderData.totalAmount,
        userId: orderData.userId,
        orderId: orderData.orderId,
        items: orderData.items.map(toDtoItems)
    }
}
export function toOrderDtos(orderData: IOrder[]): IOrderResDto[] {
    return orderData.map(toOrderDto) 
}
export function toPaginatedOrderDtos(data: IPaginatedOrderData<IOrder>): IPaginatedOrderData<IOrderResDto> {
    return {
        total: data.total,
        page: data.page,
        limit: data.limit,
        data: data.data.map(toOrderDto)
    }
}



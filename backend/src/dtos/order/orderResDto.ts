import { OrderStatus } from "aws-sdk/clients/outposts";
import { Types } from "mongoose";
import { IOrder } from "../../models/order";
import { IOrderItem, OrderItemStatus, PaymentStatus } from "../../models/orderItems";
import { IMenuItem } from "../../models/menuItem";
import { IHotelAdmin } from "../../models/hotelAdmin";
import { IMenuVariant } from "../../models/menuVarient";

export interface IPaginatedOrderData<T> {
    total: number;
    page: number;
    limit: number;
    data: T[]
}

interface IOrderItemDto {
    _id:string;
    variantId:string;
    productId: Types.ObjectId|IMenuItem;
    productName:string;
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
    hotelId: Types.ObjectId | string|Partial<IHotelAdmin>;
    totalAmount: number;
    prepaidAmount: number;
    payAmount: number;
    orderStatus: OrderStatus;
    totalItem:number;
    orderItems?:IOrderItemDto[]
}
function toDtoItems(data: IOrderItem): IOrderItemDto {
    const product=data.productId as IMenuItem
    const variant=product.variants.filter(x=>
        x._id?.toString()==data.variantId.toString()) as IMenuVariant[]
    
    return {
        _id:data?._id?.toString()??'',
        productId:data.productId,
        productName:`${product.itemName} ${variant[0].name}`,
        variantId:data.variantId.toString(),
        quantity: data.quantity,
        price: data.price,
        paymentStatus: data.paymentStatus,
        status: data.status,
        total: data.total,
        paymentId: data.paymentId,
    }

}
export function toDtoItemsArr(data:IOrderItem[]):IOrderItemDto[]{
    return data.map(toDtoItems)
}

export function toOrderDto(orderData: IOrder): IOrderResDto {
    const hotel=orderData.hotelId as IHotelAdmin
    return {
        _id: orderData._id,
        // hotelId: orderData.hotelId,
        hotelId:{_id:hotel._id,restaurantName:hotel.restaurantName},
        orderStatus: orderData.orderStatus,
        payAmount: orderData.payAmount,
        totalItem:orderData.totalItem,
        prepaidAmount: orderData.prepaidAmount,
        tableId: orderData.tableId,
        totalAmount: orderData.totalAmount,
        userId: orderData.userId,
        orderId: orderData.orderId,
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



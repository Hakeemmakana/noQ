// src/features/admin/orders/types/orderTypes.ts

export type OrderStatus =
    | "pending"
    | "preparing"
    | "ready_to_serve"
    | "picked"
    | "completed"
    | "cancelled";

export interface IOrderItem {
    _id?: string;
    productId?: IProduct;
    productName:string;
    name: string;
    image?: string;
    quantity: number;
    price: number;
    total?: number;
    status?: OrderStatus;
    paymentStatus: string;
}

export interface IOrder {
    _id?: string;
    orderId: string;
    tableId: ITable;
    userId: string;
    hotelId: IHotel;
    orderItems: IOrderItem[];
    totalAmount: number;
    prepaidAmount: number;
    payAmount: number;
    totalItem: number;
    orderStatus: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
}
interface ITable {
    _id: string;
    tableNumber: string;

}
interface IHotel {
    _id:string
    restaurantName: string
}

interface IProduct {
    itemName: string;
    itemImage: string;
}
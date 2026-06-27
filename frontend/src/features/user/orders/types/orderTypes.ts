// src/features/admin/orders/types/orderTypes.ts

export type OrderStatus =
    | "pending"
    | "confirmed"
    | "preparing"
    | "served"
    | "completed"
    | "cancelled";

export interface IOrderItem {
    _id?: string;
    productId?: IProduct;
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
    items: IOrderItem[];
    totalAmount: number;
    prepaidAmount: number;
    payAmount: number;
    orderStatus: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
}
interface ITable {
    _id: string;
    tableNumber: string;

}
interface IHotel {
    restaurantName: string
}

interface IProduct {
    itemName: string;
    itemImage: string;
}
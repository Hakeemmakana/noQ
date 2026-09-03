import { Types } from "mongoose";
import { OrderItemStatus,PaymentStatus } from "../../models/orderItems";

export interface IRevenueReport {
    period: {
        startDate: Date;
        endDate: Date;
    };

    summary: {
        totalOrders: number;
        totalItems: number;
        grossRevenue: number;
        paidRevenue: number;
        unpaidRevenue: number;
        cancelledRevenue: number;
        netRevenue: number;
        averageOrderValue: number;
    };

    dailyRevenue: {
        date: string;
        totalOrders: number;
        totalItems: number;
        revenue: number;
    }[];

    productRevenue: {
        productId: Types.ObjectId;
        productName: string;
        variantId: Types.ObjectId;
        variantName: string;
        quantity: number;
        revenue: number;
    }[];

    orders: {
        orderId: Types.ObjectId;
        date: Date;
        productName: string;
        variantName: string;
        quantity: number;
        price: number;
        total: number;
        paymentStatus: PaymentStatus;
        orderStatus: OrderItemStatus;
        paymentId?: string;
        chefName?: string;
        waiterName?: string;
    }[];
}

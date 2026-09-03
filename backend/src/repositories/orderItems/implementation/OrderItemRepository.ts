import { injectable } from "inversify";
import OrderItem, { IOrderItem, OrderItemStatus, PaymentStatus } from "../../../models/orderItems";
import { BaseRepository } from "../../IBaseRepository";
import IOrderItemRepository from "../interfaces/IOrderItemRepository";
import { QueryFilter, Types } from "mongoose";
import { OrderStatus } from "../../../models/order";
import { IPaginatedOrderData } from "../../../dtos/order/orderResDto";
import { GetWaiterOrdersQueryDTO } from "../../../dtos/order/orderReqDto";
import { IDashboardResponse, IReportQuery } from "../../../dtos/report/req.reportDto";
import { IRevenueReport } from "../../../dtos/report/res.reportDto";
interface IQuery {
    hotelId: Types.ObjectId;
    status: string;
    chefId?: Types.ObjectId;
    waiterId?: Types.ObjectId;
}
interface IQueryStatus {
    chefId?: Types.ObjectId;
    waiterId?: Types.ObjectId;
    status: string;
}
@injectable()
export default class OrderItemRepository extends BaseRepository<IOrderItem> implements IOrderItemRepository {
    constructor() {
        super(OrderItem)
    }
    async createOrder(data: IOrderItem[]): Promise<IOrderItem[]> {
        return await this.createMany(data)
    }
    async getOrders(orderId: string): Promise<IOrderItem[]> {
        const orderObjectId = new Types.ObjectId(orderId)
        return await this.getAll({ orderId: orderObjectId }, ['productId'])
    }
    async getOrderItemById(orderId: string): Promise<IOrderItem | null> {
        return await this.getByFilter({ _id: orderId })
    }
    async getOrdersChef(hotelId: string, status: string, chefId?: string): Promise<IOrderItem[]> {
        const query: IQuery = {
            hotelId: new Types.ObjectId(hotelId),
            status
        }
        if (chefId) {
            query.chefId = new Types.ObjectId(chefId)
        }
        const populate = [
            { path: 'productId' },
            {
                path: 'orderId',
                select: 'userId tableId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'tableId', select: 'tableNumber' },
                ],
            },
        ];
        return await this.getAll(query, populate)

    }
    async getOrdersByIdForNotification(orderId: string): Promise<IOrderItem[]> {

        const populate = [
            { path: 'productId' },
            {
                path: 'orderId',
                select: 'userId tableId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'tableId', select: 'tableNumber' },
                ],
            },
        ];
        return await this.getAll({ _id: orderId }, populate)

    }

    async getOrdersWaiter(hotelId: string, status: string, waiterId?: string): Promise<IOrderItem[]> {
        const query: IQuery = {
            hotelId: new Types.ObjectId(hotelId),
            status
        }
        if (waiterId) {
            query.waiterId = new Types.ObjectId(waiterId)
        }
        const populate = [
            { path: 'productId' },
            {
                path: 'orderId',
                select: 'userId tableId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'tableId', select: 'tableNumber' },
                ],
            },
        ];
        return await this.getAll(query, populate)
    }
    async updateOrderItemStatusByChef(orderId: string, status: string, chefId?: string): Promise<IOrderItem | null> {
        const updateDoc: IQueryStatus = {
            status,
        }
        if (chefId) {
            updateDoc.chefId = new Types.ObjectId(chefId)
        }
        return await this.updateById(orderId, updateDoc)
    }

    async updateOrderItemStatusByWaiter(orderId: string, status: string, waiterId?: string): Promise<IOrderItem | null> {
        const updateDoc: IQueryStatus = {
            status,
        }
        if (waiterId) {
            updateDoc.waiterId = new Types.ObjectId(waiterId)
        }
        return await this.updateById(orderId, updateDoc)
    }
    async getOrderWithoutCompleate(hotelId: string, page: number, limit: number): Promise<IPaginatedOrderData<IOrderItem>> {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
        const query = {
            hotelId: new Types.ObjectId(hotelId),
            status: { $ne: OrderStatus.COMPLETED },
            // createdAt: {
            //     $gte: startOfToday,
            //     $lt: startOfTomorrow,
            // },

        }
        const populate = [
            { path: 'productId' },
            {
                path: 'orderId',
                select: 'userId tableId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'tableId', select: 'tableNumber' },
                ],
            },
        ];
        const data = await this.getAll(query, populate, page, limit)
        const total = await this.model.countDocuments(query)
        return { data, total, page, limit }
    }
    async getOrderCompleateWaiter(hotelId: string, waiterId: string, limit: number, queryDto: GetWaiterOrdersQueryDTO): Promise<IPaginatedOrderData<IOrderItem>> {

        const filter: QueryFilter<IOrderItem> = {
            hotelId: new Types.ObjectId(hotelId),
            status: OrderStatus.COMPLETED
        }
        if (queryDto.waiterFilter == 'my-orders') {
            filter.waiterId = new Types.ObjectId(waiterId)
        }

        if (queryDto.startDate || queryDto.endDate) {
            filter.createdAt = {};

            if (queryDto.startDate) {
                filter.createdAt.$gte = queryDto.startDate;
            }

            if (queryDto.endDate) {
                filter.createdAt.$lte = queryDto.endDate;
            }
        }
        const createdAtSort: { createdAt: 1 | -1; _id: 1 | -1; } = {
            createdAt: queryDto.sort === 'oldest' ? 1 : -1,
            _id: -1,
        };
        const populate = [
            { path: 'productId' },
            {
                path: 'orderId',
                select: 'userId tableId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'tableId', select: 'tableNumber' },
                ],
            },
        ];

        const data = await this.getAll(filter, populate, queryDto.page, limit, createdAtSort)
        const total = await this.model.countDocuments(filter)
        return { data, total, page: queryDto.page, limit }
    }
    async getCompleateOrdersChef(hotelId: string, chefId: string, limit: number, queryDto: GetWaiterOrdersQueryDTO): Promise<IPaginatedOrderData<IOrderItem>> {

        const filter: QueryFilter<IOrderItem> = {
            hotelId: new Types.ObjectId(hotelId),
            status: OrderStatus.COMPLETED
        }
        if (queryDto.waiterFilter == 'my-orders') {
            filter.chefId = new Types.ObjectId(chefId)
        }

        if (queryDto.startDate || queryDto.endDate) {
            filter.createdAt = {};

            if (queryDto.startDate) {
                filter.createdAt.$gte = queryDto.startDate;
            }

            if (queryDto.endDate) {
                filter.createdAt.$lte = queryDto.endDate;
            }
        }
        const createdAtSort: { createdAt: 1 | -1; _id: 1 | -1; } = {
            createdAt: queryDto.sort === 'oldest' ? 1 : -1,
            _id: -1,
        };

        const populate = [
            { path: 'productId' },
            {
                path: 'orderId',
                select: 'userId tableId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'tableId', select: 'tableNumber' },
                ],
            },
        ];
        const data = await this.getAll(filter, populate, queryDto.page, limit, createdAtSort)
        const total = await this.model.countDocuments(filter)
        return { data, total, page: queryDto.page, limit }
    }
    async getQuickOrderWaiter(hotelId: string): Promise<IOrderItem[]> {
        const query = {
            hotelId: new Types.ObjectId(hotelId),
            status: OrderStatus.PENDING
        }
        const orders = await this.model.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "menus",
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productId'
                },
            },
            { $unwind: '$productId' },
            {
                $match: {
                    'productId.type': 'quick'
                }
            },
            // Order
            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderId',
                    foreignField: '_id',
                    as: 'order',
                },
            },
            {
                $unwind: {
                    path: '$order',
                    preserveNullAndEmptyArrays: true,
                },
            },

            // User
            {
                $lookup: {
                    from: 'users',
                    localField: 'order.userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },

            // Table
            {
                $lookup: {
                    from: 'tables',
                    localField: 'order.tableId',
                    foreignField: '_id',
                    as: 'table',
                },
            },
            {
                $unwind: {
                    path: '$table',
                    preserveNullAndEmptyArrays: true,
                },
            },

            // Keep only what you need
            {
                $project: {
                    _id: 1,
                    productId: 1,
                    variantId: 1,
                    quantity: 1,
                    price: 1,
                    total: 1,
                    status: 1,
                    updatedAt: 1,

                    orderId: {
                        _id: '$order._id',

                        userId: {
                            _id: '$user._id',
                            name: '$user.name',
                        },

                        tableId: {
                            _id: '$table._id',
                            tableNumber: '$table.tableNumber',
                        },
                    },
                },
            },


        ])
        return orders
    }
    async getNewOrderChef(hotelId: string,): Promise<IOrderItem[]> {
        const query = {
            hotelId: new Types.ObjectId(hotelId),
            status: OrderStatus.PENDING
        }
        const orders = await this.model.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: "menus",
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productId'
                },
            },
            { $unwind: '$productId' },
            {
                $match: {
                    'productId.type': 'kitchen'
                }
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderId',
                    foreignField: '_id',
                    as: 'order',
                },
            },
            {
                $unwind: {
                    path: '$order',
                    preserveNullAndEmptyArrays: true,
                },
            },

            // User
            {
                $lookup: {
                    from: 'users',
                    localField: 'order.userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },

            // Table
            {
                $lookup: {
                    from: 'tables',
                    localField: 'order.tableId',
                    foreignField: '_id',
                    as: 'table',
                },
            },
            {
                $unwind: {
                    path: '$table',
                    preserveNullAndEmptyArrays: true,
                },
            },

            // Keep only what you need
            {
                $project: {
                    _id: 1,
                    productId: 1,
                    variantId: 1,
                    quantity: 1,
                    price: 1,
                    total: 1,
                    status: 1,
                    updatedAt: 1,

                    orderId: {
                        _id: '$order._id',

                        userId: {
                            _id: '$user._id',
                            name: '$user.name',
                        },

                        tableId: {
                            _id: '$table._id',
                            tableNumber: '$table.tableNumber',
                        },
                    },
                },
            },

        ])
        return orders
    }

    async getDashBoard(hotelId: string, filter: IReportQuery, topProductLimit: number): Promise<IDashboardResponse> {
        const hotelObjectId = new Types.ObjectId(hotelId);

        const { range_type, start_date, end_date } = filter;

        const now = new Date();

        let startDate: Date;
        let endDate: Date;

        // --------------------
        // Date filter
        // --------------------

        if (range_type === "today") {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
        }

        else if (range_type === "yesterday") {
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
        }

        else if (range_type === "this_week") {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);

            // Monday = first day
            const day = startDate.getDay();
            const diff = day === 0 ? 6 : day - 1;

            startDate.setDate(startDate.getDate() - diff);

            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
        }

        else if (range_type === "custom") {
            if (!start_date || !end_date) {
                throw new Error(
                    "start_date and end_date are required for custom range"
                );
            }

            startDate = new Date(`${start_date}T00:00:00.000`);
            endDate = new Date(`${end_date}T23:59:59.999`);

            if (
                Number.isNaN(startDate.getTime()) ||
                Number.isNaN(endDate.getTime())
            ) {
                throw new Error("Invalid start_date or end_date");
            }
        }

        else {
            throw new Error("Invalid range_type");
        }

        // --------------------
        // Aggregation
        // --------------------

        const result = await OrderItem.aggregate([
            // 1. Filter hotel + date
            {
                $match: {
                    hotelId: hotelObjectId,
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },

            // 2. Run dashboard calculations independently
            {
                $facet: {

                    // ------------------------------------
                    // ORDER SUMMARY
                    // ------------------------------------
                    summary: [
                        {
                            $group: {
                                _id: "$_id",

                                // Sum all items belonging to the order
                                orderTotal: {
                                    $sum: "$total",
                                },

                                // Keep all item statuses
                                statuses: {
                                    $push: "$status",
                                },
                            },
                        },

                        {
                            $addFields: {
                                // An order is completed only if
                                // every order item is completed
                                isCompleted: {
                                    $allElementsTrue: {
                                        $map: {
                                            input: "$statuses",
                                            as: "status",
                                            in: {
                                                $eq: [
                                                    "$$status",
                                                    "completed",
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        },

                        {
                            $group: {
                                _id: null,

                                totalOrder: {
                                    $sum: 1,
                                },

                                completedOrder: {
                                    $sum: {
                                        $cond: [
                                            "$isCompleted",
                                            1,
                                            0,
                                        ],
                                    },
                                },

                                totalRevenue: {
                                    $sum: "$orderTotal",
                                },
                            },
                        },
                    ],

                    // ------------------------------------
                    // TOP PRODUCTS
                    // ------------------------------------
                    topProducts: [
                        {
                            $group: {
                                _id: "$productId",

                                quantity: {
                                    $sum: "$quantity",
                                },

                                revenue: {
                                    $sum: "$total",
                                },
                            },
                        },

                        {
                            $sort: {
                                quantity: -1,
                            },
                        },

                        {
                            $limit: topProductLimit,
                        },

                        // Lookup menu
                        {
                            $lookup: {
                                from: "menus",
                                localField: "_id",
                                foreignField: "_id",
                                as: "product",
                            },
                        },

                        {
                            $unwind: {
                                path: "$product",
                                preserveNullAndEmptyArrays: true,
                            },
                        },

                        {
                            $project: {
                                _id: 0,

                                productId: "$_id",

                                productName: "$product.itemName",

                                productImage: "$product.itemImage",

                                quantity: 1,

                                revenue: 1,
                            },
                        },
                    ],
                },
            },

            // 3. Convert facet result into dashboard object
            {
                $project: {
                    _id: 0,

                    totalOrder: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    "$summary.totalOrder",
                                    0,
                                ],
                            },
                            0,
                        ],
                    },

                    completedOrder: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    "$summary.completedOrder",
                                    0,
                                ],
                            },
                            0,
                        ],
                    },

                    totalRevenue: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    "$summary.totalRevenue",
                                    0,
                                ],
                            },
                            0,
                        ],
                    },

                    topProducts: 1,
                },
            },
        ]);

        return (
            result[0] || {
                totalOrder: 0,
                completedOrder: 0,
                totalRevenue: 0,
                topProducts: [],
            }
        );
    }

    async getRevenueReport(hotelId: string, query: IReportQuery): Promise<IRevenueReport> {

        const { range_type, start_date, end_date } = query;

        const now = new Date();

        let startDate: Date;
        let endDate: Date;

        // --------------------
        // Date filter
        // --------------------

        if (range_type === "today") {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
        }

        else if (range_type === "yesterday") {
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);
        }

        else if (range_type === "this_week") {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);

            // Monday = first day
            const day = startDate.getDay();
            const diff = day === 0 ? 6 : day - 1;

            startDate.setDate(startDate.getDate() - diff);

            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
        }

        else if (range_type === "custom") {
            if (!start_date || !end_date) {
                throw new Error(
                    "start_date and end_date are required for custom range"
                );
            }

            startDate = new Date(`${start_date}T00:00:00.000`);
            endDate = new Date(`${end_date}T23:59:59.999`);

            if (
                Number.isNaN(startDate.getTime()) ||
                Number.isNaN(endDate.getTime())
            ) {
                throw new Error("Invalid start_date or end_date");
            }
        }

        else {
            throw new Error("Invalid range_type");
        }

        const result = await OrderItem.aggregate([
            {
                $match: {
                    hotelId: new Types.ObjectId(hotelId),
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                },
            },

            {
                $facet: {
                    summary: [
                        {
                            $group: {
                                _id: null,

                                orders: {
                                    $addToSet: "$orderId",
                                },

                                totalItems: {
                                    $sum: "$quantity",
                                },

                                grossRevenue: {
                                    $sum: "$total",
                                },

                                paidRevenue: {
                                    $sum: {
                                        $cond: [
                                            {
                                                $eq: [
                                                    "$paymentStatus",
                                                    PaymentStatus.PAID,
                                                ],
                                            },
                                            "$total",
                                            0,
                                        ],
                                    },
                                },

                                unpaidRevenue: {
                                    $sum: {
                                        $cond: [
                                            {
                                                $eq: [
                                                    "$paymentStatus",
                                                    PaymentStatus.UNPAID,
                                                ],
                                            },
                                            "$total",
                                            0,
                                        ],
                                    },
                                },

                                cancelledRevenue: {
                                    $sum: {
                                        $cond: [
                                            {
                                                $eq: [
                                                    "$status",
                                                    OrderItemStatus.CANCELLED,
                                                ],
                                            },
                                            "$total",
                                            0,
                                        ],
                                    },
                                },
                            },
                        },

                        {
                            $project: {
                                _id: 0,

                                totalOrders: {
                                    $size: "$orders",
                                },

                                totalItems: 1,
                                grossRevenue: 1,
                                paidRevenue: 1,
                                unpaidRevenue: 1,
                                cancelledRevenue: 1,
                            },
                        },
                    ],

                    dailyRevenue: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: {
                                        format: "%Y-%m-%d",
                                        date: "$createdAt",
                                    },
                                },

                                orders: {
                                    // $addToSet: "$orderId",
                                    $addToSet: "$_id",

                                },

                                totalItems: {
                                    $sum: "$quantity",
                                },

                                revenue: {
                                    $sum: "$total",
                                },
                            },
                        },

                        {
                            $project: {
                                _id: 0,
                                date: "$_id",

                                totalOrders: {
                                    $size: "$orders",
                                },

                                totalItems: 1,
                                revenue: 1,
                            },
                        },

                        {
                            $sort: {
                                date: 1,
                            },
                        },
                    ],

                    productRevenue: [
                        {
                            $group: {
                                _id: {
                                    productId: "$productId",
                                    variantId: "$variantId",
                                },

                                quantity: {
                                    $sum: "$quantity",
                                },

                                revenue: {
                                    $sum: "$total",
                                },
                            },
                        },

                        // Get product
                        {
                            $lookup: {
                                from: "menus",
                                localField: "_id.productId",
                                foreignField: "_id",
                                as: "product",
                            },
                        },

                        {
                            $unwind: {
                                path: "$product",
                                preserveNullAndEmptyArrays: true,
                            },
                        },

                        // Find the variant inside product.variants
                        {
                            $set: {
                                variant: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$product.variants",
                                                as: "variant",
                                                cond: {
                                                    $eq: [
                                                        "$$variant._id",
                                                        "$_id.variantId",
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },

                        // Create single display name
                        {
                            $project: {
                                _id: 0,

                                productName: {
                                    $concat: [
                                        {
                                            $ifNull: [
                                                "$product.itemName",
                                                "Unknown Product",
                                            ],
                                        },

                                        " - ",

                                        {
                                            $ifNull: [
                                                "$variant.name",
                                                "Unknown Variant",
                                            ],
                                        },
                                    ],
                                },

                                quantity: 1,
                                revenue: 1,
                            },
                        },

                        {
                            $sort: {
                                revenue: -1,
                            },
                        },
                    ],

                    orders: [
                        {
                            $sort: {
                                createdAt: -1,
                            },
                        },

                        // Get product
                        {
                            $lookup: {
                                from: "menus",
                                localField: "productId",
                                foreignField: "_id",
                                as: "product",
                            },
                        },

                        {
                            $unwind: {
                                path: "$product",
                                preserveNullAndEmptyArrays: true,
                            },
                        },

                        // Find variant from product.variants
                        {
                            $set: {
                                variant: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$product.variants",
                                                as: "variant",
                                                cond: {
                                                    $eq: [
                                                        "$$variant._id",
                                                        "$variantId",
                                                    ],
                                                },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },

                        {
                            $project: {
                                _id: 0,

                                orderId: 1,

                                date: "$createdAt",

                                // Product + Variant as one string
                                productName: {
                                    $concat: [
                                        {
                                            $ifNull: [
                                                "$product.itemName",
                                                "Unknown Product",
                                            ],
                                        },
                                        " - ",
                                        {
                                            $ifNull: [
                                                "$variant.name",
                                                "Unknown Variant",
                                            ],
                                        },
                                    ],
                                },

                                quantity: 1,

                                price: 1,

                                total: 1,

                                paymentStatus: 1,

                                orderStatus: "$status",

                                paymentId: 1,

                                chefId: 1,

                                waiterId: 1,
                            },
                        },
                    ],
                },
            },
        ]);

        const data = result[0];

        const summary = data.summary[0] ?? {
            totalOrders: 0,
            totalItems: 0,
            grossRevenue: 0,
            paidRevenue: 0,
            unpaidRevenue: 0,
            cancelledRevenue: 0,
        };

        return {
            period: {
                startDate,
                endDate,
            },

            summary: {
                ...summary,

                netRevenue:
                    summary.paidRevenue - summary.cancelledRevenue,

                averageOrderValue:
                    summary.totalOrders > 0
                        ? summary.grossRevenue / summary.totalOrders
                        : 0,
            },

            dailyRevenue: data.dailyRevenue,

            productRevenue: data.productRevenue,

            orders: data.orders,
        };
    }
    async getUnpaidOrder(orderId: string): Promise<IOrderItem[]> {
        const query={
            orderId:new Types.ObjectId(orderId),
            paymentStatus:PaymentStatus.UNPAID
        }
        return await this.getAll(query)
    }
    async updateStautsAfterPay(orderId: string,paymentId:string): Promise<IOrderItem|null> {
        const updateData={
            paymentStatus:PaymentStatus.PAID,
            paymentId:paymentId
        }
        return await this.updateById(orderId,updateData)
    }

}

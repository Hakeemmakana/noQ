import { injectable, inject } from "inversify";
import ICheckoutService from "../interface/ICheckoutService";
import { TYPES } from "../../../DI/types";
import CartRepository from "../../../repositories/cart/implementation/cartRepository";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { AppError } from "../../../middleware/errorHandler";
import { CART_NOT_FOUND, ORDER_NOT_FOUND, TABLE_NOT_FOUND } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { IMenuItem } from "../../../models/menuItem";
import { checkoutWithProductDto, IOrderandPayResDto, IPostCheckoutResDto, IStockValidationResponse, toCheckoutResDto } from "../../../dtos/checkout/checkout.resDto";
import { IOrder, OrderStatus, } from "../../../models/order";
import IPaymentGateway from "../../paymentServic/interface/IPaymentGateway";
import redisClient from "../../../config/redis";
import { IorderNow } from "../../../dtos/checkout/checkout.reqDto";
import IOrderRepository from "../../../repositories/order/interface/IOrderRepository";
import IOrderItemRepository from "../../../repositories/orderItems/interfaces/IOrderItemRepository";
import { IOrderItem, OrderItemStatus, PaymentStatus } from "../../../models/orderItems";
import { IMenuVariant } from "../../../models/menuVarient";
import INotificationService from "../../notificationService/interface/INotifactionService";
import { cartItems } from "../../../models/cart";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
@injectable()
export default class CheckoutService implements ICheckoutService {
    constructor(@inject(TYPES.CartRepository) private _cartRepository: CartRepository,
        @inject(TYPES.MenuItemRepository) private _menuItemRepository: IMenuRepository,
        @inject(TYPES.OrderRepository) private _orderRepository: IOrderRepository,
        @inject(TYPES.OrderItemRepository) private _orderItemRepository: IOrderItemRepository,
        @inject(TYPES.PaymentService) private _paymentService: IPaymentGateway,
        @inject(TYPES.NotificationService) private _notificationService: INotificationService) { }
    private validateStock(cartItems: cartItems[]): IStockValidationResponse | null {
        // 1. Build the total consumption map for SHARED stock mode
        const sharedConsumptionMap = new Map<string, number>();

        for (const val of cartItems) {
            const product = val.itemId as IMenuItem;
            const variant = product.variants?.find(x =>
                x._id?.toString() == val.variantId?.toString()
            ) as IMenuVariant;

            if (!product || !variant) continue;

            const productIdStr = String(product._id);
            const stockFactor = variant.stockFactor ?? 1;

            if (product.stockMode === 'SHARED') {
                const currentTotal = sharedConsumptionMap.get(productIdStr) || 0;
                sharedConsumptionMap.set(productIdStr, currentTotal + (val.quantity * stockFactor));
            }
        }

        // 2. Filter out unavailable or over-stocked items
        const unavailableItems = cartItems.filter(item => {
            const product = item.itemId as IMenuItem;
            if (!product || !product.isAvailable) return true;

            const variant = product.variants?.find(x =>
                x._id?.toString() == item.variantId?.toString()
            ) as IMenuVariant;

            if (!variant) return true;

            const productIdStr = String(product._id);
            // const stockFactor = variant.stockFactor ?? 1;

            if (product.stockMode === 'PER_VARIANT') {
                const requiredStock = item.quantity;
                const variantStock = variant.stock ?? 0;
                return variantStock <= 0 || requiredStock > variantStock;
            }

            if (product.stockMode === 'SHARED') {
                const totalConsumed = sharedConsumptionMap.get(productIdStr) || 0;
                return product.stock <= 0 || totalConsumed > product.stock;
            }

            return false;
        });

        // 3. Return stock issue structure if any items fail validation
        if (unavailableItems.length > 0) {
            return {
                hasStockIssue: true,
                items: unavailableItems.map(item => {
                    const product = item.itemId as IMenuItem;
                    const variant = product.variants?.find(x =>
                        x._id?.toString() == item.variantId?.toString()
                    ) as IMenuVariant;

                    const isShared = product.stockMode === 'SHARED';
                    const availableStock = isShared ? product.stock : (variant?.stock ?? 0);
                    const totalConsumed = sharedConsumptionMap.get(String(product._id)) || 0;
                    const requestedQty = isShared ? totalConsumed : item.quantity;

                    return {
                        productId: product._id?.toString(),
                        productName: `${product.itemName}${variant ? ` (${variant.name})` : ''}`,
                        availableStock: availableStock,
                        requestedQty: requestedQty
                    };
                })
            };
        }

        return null;
    }
    getCheckout = async (userId: string, hotelId: string): Promise<checkoutWithProductDto | IStockValidationResponse> => {
        const cart = await this._cartRepository.getCartWithProduct(userId, hotelId)
        if (!cart || cart.items.length == 0) {
            throw new AppError(CART_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const stockIssue = this.validateStock(cart.items);
        if (stockIssue) {
            return stockIssue;
        }
        // const unavailableItems = cart.items.filter(item => {
        //     const product = item.itemId as IMenuItem;

        //     return (
        //         !product.isAvailable ||
        //         product.stock <= 0 ||
        //         item.quantity > product.stock
        //     );
        // });

        // if (unavailableItems.length > 0) {
        //     return {
        //         hasStockIssue: true,
        //         items: unavailableItems.map(item => {
        //             const product = item.itemId as IMenuItem;
        //             return {
        //                 productId: product._id?.toString(),
        //                 productName: product.itemName,
        //                 availableStock: product.stock,
        //                 requestedQty: item.quantity
        //             }
        //         })
        //     }
        // }
        const total = cart.items.reduce((sum, item) => {
            const product = item.itemId as IMenuItem
            const variant = product.variants.find(x =>
                x._id?.toString() == item.variantId.toString()) as IMenuVariant
            return sum + item.quantity * variant.price
        }, 0)
        const checkoutResDto = toCheckoutResDto(cart, total)
        return checkoutResDto

    }
    createOrder = async (userId: string, hotelId: string, data: IorderNow): Promise<IPostCheckoutResDto> => {
        const { orderType, tableId } = data
        if (!tableId) {
            throw new AppError(TABLE_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const cart = await this._cartRepository.getCartWithProduct(userId, hotelId)
        if (!cart || cart.items.length == 0) {
            throw new AppError(CART_NOT_FOUND, HttpStatus.NOT_FOUND)
        }


        // const unavailableItems = cart.items.filter(item => {
        //     const product = item.itemId as IMenuItem;
        //     const variant = product.variants.find(x =>
        //         x._id?.toString() == item.variantId.toString()) as IMenuVariant

        //     return (
        //         !product.isAvailable ||
        //         product.stock <= 0 ||
        //         item.quantity > product.stock
        //     );
        // });
        // // loop and return each product  with details
        // if (unavailableItems.length > 0) {
        //     return {
        //         type: 'STOCK_ISSUE',
        //         payload: {
        //             hasStockIssue: true,
        //             items: unavailableItems.map(item => {
        //                 const product = item.itemId as IMenuItem;
        //                 return {
        //                     productId: product._id?.toString(),
        //                     productName: product.itemName,
        //                     availableStock: product.stock,
        //                     requestedQty: item.quantity
        //                 }
        //             })
        //         }
        //     }
        // }

        //......................
        const stockIssue = this.validateStock(cart.items)
        if (stockIssue) {
            return {
                type: 'STOCK_ISSUE',
                payload: stockIssue
            }
        }

        //.........................
        let order = await this._orderRepository.findActiveOrder(
            userId,
            hotelId,
            tableId
        );
        //order not exist
        if (!order) {
            order = await this._orderRepository.createOrder({
                userId,
                hotelId,
                tableId,
                totalAmount: 0,
                prepaidAmount: 0,
                payAmount: 0,
                totalItem: 0,
                orderStatus: OrderStatus.PENDING
            });
        }
        const orderItems: IOrderItem[] = cart.items.map(item => {
            const product = item.itemId as IMenuItem;
            const variant = product.variants.find(x =>
                x._id?.toString() == item.variantId.toString()) as IMenuVariant;
            const itemPrice = variant ? variant.price : 0;
            return {
                orderId: order?._id,
                tableId: order?.tableId,
                hotelId: order?.hotelId,
                productId: product._id,
                variantId: variant._id,
                price: itemPrice,
                // price: 100,
                quantity: item.quantity,
                // total: item.quantity * product.price,
                total: item.quantity * itemPrice,
                paymentStatus: PaymentStatus.UNPAID,
                status: OrderItemStatus.PENDING
            };
        }) as IOrderItem[]
        // for(const item of cart.items){
        //     const product=item.itemId as IMenuItem

        // }

        const totalAmount = cart.items.reduce((sum, item) => {
            const product = item.itemId as IMenuItem
            const variant = product.variants.find(x =>
                x._id?.toString() == item.variantId.toString()) as IMenuVariant;
            const itemPrice = variant ? variant.price : 100;
            // return sum + item.quantity * product.price
            return sum + item.quantity * itemPrice
        }, 0)
        if (orderType == 'ORDER_NOW') {

            // if (order) {
            const updatedTotalAmount = order.totalAmount + totalAmount;
            const updatedPayAmount = updatedTotalAmount - order.prepaidAmount;
            const updatedTotalItem = order.totalItem + cart.items.length
            const updatedData = {
                totalAmount: updatedTotalAmount,
                payAmount: updatedPayAmount,
                totalItem: updatedTotalItem
            }
            await this._orderRepository.updateOrder(order._id!.toString(), updatedData)
            const orderItemFromDb = await this._orderItemRepository.createOrder(orderItems)
            await this._cartRepository.deleteCart(userId, hotelId);
            await this._notificationService.NewOrder(orderItemFromDb)
            return { type: 'ORDER_SUCCESS', payload: { orderId: order._id!.toString(), itemLength: orderItems.length } };
            // }

            // await this._cartRepository.deleteCart(userId, hotelId);
            // return { type: 'ORDER_SUCCESS', payload: { orderId: newOrder._id!.toString(),itemLength:orderItems.length } };

        } else {
            // stipe payment 
            const { clientSecret, paymentIntentId } = await this._paymentService.createPaymentIntent(totalAmount * 100);

            await redisClient.set(`checkout:${paymentIntentId}`,
                JSON.stringify({
                    userId,
                    hotelId,
                    tableId,
                    items: orderItems,
                    totalAmount,
                    status: "PENDING"
                }),
                { EX: 60 * 30 }
            );
            return {
                type: 'STRIPE_PAYMENT',
                payload: {
                    clientSecret,
                    paymentIntentId
                }
            };
        }
    }
    stipeWebhook = async (body: string | Buffer, signature: string) => {
        const event = this._paymentService.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || STRIPE_WEBHOOK_SECRET!
        );
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            const cachedData = await redisClient.get(`checkout:${paymentIntentId}`);
            if (!cachedData) {
                return;
            }
            const data = JSON.parse(cachedData)
            if (data.paymentType && data.paymentType === 'pay_remaining') {
                const { orderItems, } = data
               
                for (const item of orderItems) {
                    if (item._id) {
                        await this._orderItemRepository.updateStautsAfterPay(item._id?.toString(), paymentIntentId)
                    }
                }
                await this._orderRepository.updateOrder(orderItems[0].orderId.toString(), {
                    payAmount: 0
                });
                await redisClient.del(`checkout:${paymentIntentId}`);
                return

            }
            const { userId, hotelId, tableId, items, totalAmount } = JSON.parse(cachedData);
            const paidItems: IOrderItem[] = items.map((item: IOrderItem) => ({
                ...item,
                paymentId: paymentIntentId,
                paymentStatus: PaymentStatus.PAID,
                status: OrderItemStatus.PENDING
            }));
            const existingOrder = await this._orderRepository.findActiveOrder(userId, hotelId, tableId);
            if (existingOrder && existingOrder._id) {
                await this._orderRepository.updateOrder(existingOrder._id.toString(), {
                    // items: [...paidItems, ...existingOrder.items],
                    totalAmount: existingOrder.totalAmount + totalAmount,
                    prepaidAmount: existingOrder.prepaidAmount + totalAmount,
                    totalItem: existingOrder.totalItem + paidItems.length
                });
                await this._orderItemRepository.createOrder(paidItems)
            } else {
                const newOrderData: IOrder = {
                    userId,
                    hotelId,
                    tableId,
                    // items: paidItems,
                    totalItem: paidItems.length,
                    totalAmount,
                    prepaidAmount: totalAmount,
                    payAmount: 0,
                    orderStatus: OrderStatus.PENDING
                } as IOrder
                await this._orderRepository.createOrder(newOrderData);
                await this._orderItemRepository.createOrder(paidItems)
            }

            await this._cartRepository.deleteCart(userId, hotelId);
            await redisClient.del(`checkout:${paymentIntentId}`);
        }
    }
    remainingPayment = async (userId: string, hotelId: string): Promise<IOrderandPayResDto> => {
        const order = await this._orderRepository.findActiveOrderWithoutTable(userId, hotelId)
        if (!order || !order._id) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const orderItems = await this._orderItemRepository.getUnpaidOrder(order?._id?.toString())
        if (!orderItems) {
            throw new AppError(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const totalAmount = orderItems.reduce((acc, elem) => acc + (elem.price * elem.quantity), 0)
        const { clientSecret, paymentIntentId } = await this._paymentService.createPaymentIntent(totalAmount * 100);

        await redisClient.set(`checkout:${paymentIntentId}`,
            JSON.stringify({
                orderItems,
                totalAmount,
                paymentType: 'pay_remaining'
            }),
            { EX: 60 * 30 }
        );
        return { clientSecret, paymentIntentId };

    }

}
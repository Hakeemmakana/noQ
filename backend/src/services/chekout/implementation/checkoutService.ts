import { injectable, inject } from "inversify";
import ICheckoutService from "../interface/ICheckoutService";
import { TYPES } from "../../../DI/types";
import CartRepository from "../../../repositories/cart/implementation/cartRepository";
import IMenuRepository from "../../../repositories/menu/interface/IMenuRespository";
import { AppError } from "../../../middleware/errorHandler";
import { CART_NOT_FOUND } from "../../../constants/messages";
import HttpStatus from "../../../constants/httpStatusCode";
import { IMenuItem } from "../../../models/menuItem";
import { checkoutWithProductDto, IPostCheckoutResDto, IStockValidationResponse, toCheckoutResDto } from "../../../dtos/checkout/checkout.resDto";
import { IOrder, IOrderItem, OrderItemStatus, OrderStatus, PaymentStatus } from "../../../models/order";
import IPaymentGateway from "../../paymentServic/interface/IPaymentGateway";
import redisClient from "../../../config/redis";
import { IorderNow } from "../../../dtos/checkout/checkout.reqDto";
import IOrderRepository from "../../../repositories/order/interface/IOrderRepository";
const STRIPE_WEBHOOK_SECRET=process.env.STRIPE_WEBHOOK_SECRET
@injectable()
export default class CheckoutService implements ICheckoutService {
    constructor(@inject(TYPES.CartRepository) private _cartRepository: CartRepository,
        @inject(TYPES.MenuItemRepository) private _menuItemRepository: IMenuRepository,
        @inject(TYPES.OrderRepository) private _orderRepository: IOrderRepository,
        @inject(TYPES.PaymentService) private _paymentService: IPaymentGateway) { }
    getCheckout = async (userId: string, hotelId: string): Promise<checkoutWithProductDto | IStockValidationResponse> => {
        const cart = await this._cartRepository.getCartWithProduct(userId, hotelId)
        if (!cart || cart.items.length == 0) {
            throw new AppError(CART_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const unavailableItems = cart.items.filter(item => {
            const product = item.itemId as IMenuItem;

            return (
                !product.isAvailable ||
                product.stock <= 0 ||
                item.quantity > product.stock
            );
        });

        if (unavailableItems.length > 0) {
            return {
                hasStockIssue: true,
                items: unavailableItems.map(item => {
                    const product = item.itemId as IMenuItem;
                    return {
                        productId: product._id?.toString(),
                        productName: product.itemName,
                        availableStock: product.stock,
                        requestedQty: item.quantity
                    }
                })
            }
        }
        const total = cart.items.reduce((sum, item) => {
            const product = item.itemId as IMenuItem
            return sum + item.quantity * product.price
        }, 0)
        const checkoutResDto = toCheckoutResDto(cart, total)
        return checkoutResDto

    }
    createOrder = async (userId: string, hotelId: string, data: IorderNow): Promise<IPostCheckoutResDto> => {
        const { orderType, tableId } = data
        const cart = await this._cartRepository.getCartWithProduct(userId, hotelId)
        if (!cart || cart.items.length == 0) {
            throw new AppError(CART_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        // if out of stock
        const unavailableItems = cart.items.filter(item => {
            const product = item.itemId as IMenuItem;

            return (
                !product.isAvailable ||
                product.stock <= 0 ||
                item.quantity > product.stock
            );
        });
        // loop and return each product  with details
        if (unavailableItems.length > 0) {
            return {
                type: 'STOCK_ISSUE',
                payload: {
                    hasStockIssue: true,
                    items: unavailableItems.map(item => {
                        const product = item.itemId as IMenuItem;
                        return {
                            productId: product._id?.toString(),
                            productName: product.itemName,
                            availableStock: product.stock,
                            requestedQty: item.quantity
                        }
                    })
                }
            }
        }
        const orderItems: IOrderItem[] = cart.items.map(item => {
            const product = item.itemId as IMenuItem;
            return {
                productId: product._id,
                price: product.price,
                quantity: item.quantity,
                total: item.quantity * product.price,
                paymentStatus: PaymentStatus.UNPAID,
                status: OrderItemStatus.PENDING
            };
        }) as IOrderItem[]

        const totalAmount = cart.items.reduce((sum, item) => {
            const product = item.itemId as IMenuItem
            return sum + item.quantity * product.price
        }, 0)
        if (orderType == 'ORDER_NOW') {
            const order = await this._orderRepository.findActiveOrder(
                userId,
                hotelId,
                tableId
            );
            //order exist
            if (order) {
                const updatedItems = [
                    ...orderItems,
                    ...order.items];
                const updatedTotalAmount = order.totalAmount + totalAmount;
                const updatedPayAmount = updatedTotalAmount - order.prepaidAmount;
                const updatedData = {
                    items: updatedItems,
                    totalAmount: updatedTotalAmount,
                    payAmount: updatedPayAmount
                }
                await this._orderRepository.updateOrder(order._id!.toString(), updatedData)
                await this._cartRepository.deleteCart(userId, hotelId);
                return { type: 'ORDER_SUCCESS', payload: { orderId: order._id!.toString() ,itemLength:orderItems.length} };
            }
            const newOrder = await this._orderRepository.createOrder({
                userId,
                hotelId,
                tableId,
                items: orderItems,
                totalAmount,
                prepaidAmount: 0,
                payAmount: totalAmount,
                orderStatus: OrderStatus.PENDING
            });
            await this._cartRepository.deleteCart(userId, hotelId);
            return { type: 'ORDER_SUCCESS', payload: { orderId: newOrder._id!.toString(),itemLength:orderItems.length } };

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
    stipeWebhook = async (body: string|Buffer, signature: string) => {
        const event = this._paymentService.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET||STRIPE_WEBHOOK_SECRET!
        );
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            const cachedData = await redisClient.get(`checkout:${paymentIntentId}`);
            if (!cachedData) {
                console.error("No checkout data found in Redis for:", paymentIntentId);
                return;
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
                    items: [...paidItems, ...existingOrder.items],
                    totalAmount: existingOrder.totalAmount + totalAmount,
                    prepaidAmount: existingOrder.prepaidAmount + totalAmount
                });
            } else {
                const newOrderData: IOrder = {
                    userId,
                    hotelId,
                    tableId,
                    items: paidItems,
                    totalAmount,
                    prepaidAmount: totalAmount,
                    payAmount: 0,
                    orderStatus: OrderStatus.PENDING
                } as IOrder
                await this._orderRepository.createOrder(newOrderData);
            }

            await this._cartRepository.deleteCart(userId, hotelId);
            await redisClient.del(`checkout:${paymentIntentId}`);
        }
    }

}
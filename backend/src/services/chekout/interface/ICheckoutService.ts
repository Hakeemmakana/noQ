import { IorderNow } from "../../../dtos/checkout/checkout.reqDto"
import { checkoutWithProductDto, IOrderandPayResDto, IPostCheckoutResDto, IStockValidationResponse } from "../../../dtos/checkout/checkout.resDto"

export default interface ICheckoutService {
    getCheckout(userId:string,hotelId:string):Promise<checkoutWithProductDto|IStockValidationResponse>
    createOrder(userId:string,hotelId:string,data:IorderNow):Promise<IPostCheckoutResDto>;
    remainingPayment(userId:string,hotelId:string):Promise<IOrderandPayResDto>;
    stipeWebhook  (body: string|Buffer,signature:string): Promise<void> ;
}
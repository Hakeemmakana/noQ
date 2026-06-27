import { IOrderResDto, IPaginatedOrderData } from "../../../dtos/order/orderResDto";
import { IOrder } from "../../../models/order";

export default interface IOrderService{
    getAllOrders(userId:string,hotelId:string):Promise<IOrderResDto[] | null>
    getAllAdminOrders(hotelId: string,search:string,page:number):Promise<IPaginatedOrderData<IOrderResDto> | null>
    getOneOrder(orderId:string):Promise<IOrderResDto|null>
}
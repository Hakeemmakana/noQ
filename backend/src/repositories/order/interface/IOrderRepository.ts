
import { IPaginatedOrderData } from "../../../dtos/order/orderResDto";
import { IOrder } from "../../../models/order";

export default interface IOrderRepository{
    findActiveOrder(userId:string,hotelId:string,tableId:string):Promise<IOrder|null>;
    updateOrder(id:string,data:Partial<IOrder>):Promise<IOrder|null>;
    createOrder(data:IOrder):Promise<IOrder>;
    getAllOrders(userId:string,hotelId:string):Promise<IOrder[]|null>;
    getAllAdminOrders(hotelId:string,search:string,page:number,limit:number):Promise<IPaginatedOrderData<IOrder>|null>;
    getOneOrder(orderId:string):Promise<IOrder|null>;
}
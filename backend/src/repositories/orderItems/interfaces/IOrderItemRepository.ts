import { GetWaiterOrdersQueryDTO } from "../../../dtos/order/orderReqDto";
import { IPaginatedOrderData } from "../../../dtos/order/orderResDto";
import { IDashboardResponse, IReportQuery } from "../../../dtos/report/req.reportDto";
import { IRevenueReport } from "../../../dtos/report/res.reportDto";
import { IOrderItem } from "../../../models/orderItems";

export default  interface IOrderItemRepository {
    createOrder(data:IOrderItem[]):Promise<IOrderItem[]>;
    getOrders(orderId:string):Promise<IOrderItem[]>
    getOrderItemById(orderId:string):Promise<IOrderItem|null>
    getOrdersChef(hotelId: string, status: string, chefId?: string): Promise<IOrderItem[]>
    getOrdersWaiter(hotelId: string, status: string, chefId?: string): Promise<IOrderItem[]>
    updateOrderItemStatusByChef(orderId:string,status:string,chefId?:string):Promise<IOrderItem|null>
    updateOrderItemStatusByWaiter(orderId:string,status:string,waiterId?:string):Promise<IOrderItem|null>
    getOrderWithoutCompleate(hotelId:string,page:number,limit:number): Promise<IPaginatedOrderData<IOrderItem>>
    getOrderCompleateWaiter(hotelId:string,waiterId: string,limit:number,query:GetWaiterOrdersQueryDTO): Promise<IPaginatedOrderData<IOrderItem>>
    getCompleateOrdersChef(hotelId:string,chef: string,limit:number,query:GetWaiterOrdersQueryDTO): Promise<IPaginatedOrderData<IOrderItem>>
    getQuickOrderWaiter(hotelId:string):Promise<IOrderItem[]>
    getNewOrderChef(hotelId: string): Promise<IOrderItem[]>
    getOrdersByIdForNotification(orderId:string): Promise<IOrderItem[]>
    getDashBoard(hotelId:string,filter:IReportQuery,topProductLimit:number): Promise<IDashboardResponse>
    getRevenueReport(hotelId:string,filter:IReportQuery,): Promise<IRevenueReport>
    getUnpaidOrder(orderId:string):Promise<IOrderItem[]>;
    updateStautsAfterPay(orderId:string,paymentId:string):Promise<IOrderItem|null>
}
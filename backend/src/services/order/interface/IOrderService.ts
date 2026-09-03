import { GetWaiterOrdersQueryDTO } from "../../../dtos/order/orderReqDto";
import { IOrderResDto, IPaginatedOrderData } from "../../../dtos/order/orderResDto";
import { IOrderResForStaffDto } from "../../../dtos/order/orderResforstaffDto";
import { IOrder } from "../../../models/order";
import { IOrderItem } from "../../../models/orderItems";

export default interface IOrderService{
    getAllOrders(userId:string,hotelId:string):Promise<IOrderResDto[] | null>
    getAllAdminOrders(hotelId: string,search:string,page:number):Promise<IPaginatedOrderData<IOrderResDto> | null>
    getOneOrder(orderId:string):Promise<IOrderResDto|null>
    //chef get request
    getNewOrders(hotelId:string):Promise<IOrderResForStaffDto[]>
    getAccpetedOrders(hotelId:string,chefId:string):Promise<IOrderResForStaffDto[]>
    getReadyOrders(hotelId:string,chefId:string):Promise<IOrderResForStaffDto[]>
    getCompletedOrders(hotelId:string,chefId:string,query: GetWaiterOrdersQueryDTO) :Promise<IPaginatedOrderData<IOrderResForStaffDto>>
    // chef patch
    accpetOrder(hotelId:string,orderId:string,chefId:string):Promise<IOrderItem>
    markOrderReady(hotelId:string,orderId:string,chefId:string):Promise<IOrderItem>
    //waiter
    getReadyToServeOrders(hotelId:string,waiterId:string):Promise<IOrderResForStaffDto[]>
    getPickedOrders(hotelId:string,waiterId:string):Promise<IOrderResForStaffDto[]>
    getwithoutCompleteOrderWaiter(hotelId:string,page:number):Promise<IPaginatedOrderData<IOrderResForStaffDto>>
    getCompleteOrderWaiter(hotelId:string,waiterId:string,query:GetWaiterOrdersQueryDTO):Promise<IPaginatedOrderData<IOrderResForStaffDto>>
    getQuickOrderWaiter(hotelId:string):Promise<IOrderResForStaffDto[]>
    //wiater patch
    markOrderCompleated(hotelId:string,orderId:string,waiterId:string):Promise<IOrderItem>
    markOrderPicked(hotelId:string,orderId:string,waiterId:string):Promise<IOrderItem>
    markMainOrderCompleted(hotelId:string,orderId:string):Promise<IOrder|null>


}
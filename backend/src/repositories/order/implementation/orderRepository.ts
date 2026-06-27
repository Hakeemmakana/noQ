import { QueryFilter, Types } from "mongoose";
import Order, { IOrder, OrderStatus } from "../../../models/order";
import { BaseRepository } from "../../IBaseRepository";
import IOrderRepository from "../interface/IOrderRepository";
import { IPaginatedOrderData } from "../../../dtos/order/orderResDto";

export default class OrderRepository extends BaseRepository<IOrder> implements IOrderRepository{
    constructor(){
        super(Order)
    }
    async findActiveOrder(userId:string,hotelId:string,tableId:string):Promise<IOrder|null>{
        const filter: QueryFilter<IOrder> = {
            userId: new Types.ObjectId(userId),
            hotelId: new Types.ObjectId(hotelId),
            tableId: new Types.ObjectId(tableId),
            orderStatus: { 
                $in: [OrderStatus.PENDING,] 
            }
        };
        return await this.getByFilter(filter)
    }
    async updateOrder(id:string,data:Partial<IOrder>):Promise<IOrder|null>{
        return await this.updateById(id,data)
    }
    async createOrder(data:IOrder):Promise<IOrder>{
        const newOrder={
            ...data,
            hotelId: new Types.ObjectId(data.hotelId),
            userId: new Types.ObjectId(data.userId),
            tableId: new Types.ObjectId(data.tableId),
        }
        return await this.create(newOrder)
    }
    async getAllOrders(userId:string,hotelId:string):Promise<IOrder[]|null>{
        const filter={
            userId:new Types.ObjectId(userId),
            hotelId:new Types.ObjectId(hotelId)
        }
        return await this.getAll(filter)
    }
    async getAllAdminOrders(hotelId:string,search:string,page:number,limit:number):Promise<IPaginatedOrderData<IOrder>|null>{
        const filter:QueryFilter<IOrder>={
            hotelId:new Types.ObjectId(hotelId)
        }
        if (search) {
            filter.$or = [
                { orderId: { $regex: `^${search}`, $options: 'i' } },
            ]
        }
        return  await this.getPaginatedData(filter,page,limit)
      
    }
    async getOneOrder(orderId:string):Promise<IOrder|null>{
        return await  this.getOneWithPopulate({_id:orderId}).populate(['hotelId','tableId','items.productId'])
    }
}
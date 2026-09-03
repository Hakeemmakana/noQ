    import { inject, injectable } from "inversify";
    import IOrderController from "../interface/IOrderController";
    import { TYPES } from "../../../DI/types";
    import IOrderService from "../../../services/order/interface/IOrderService";
    import { Response, NextFunction, Request, } from "express";
    import { AuthRequest } from "../../../middleware/jwt";
    import { apiResponse } from "../../../utils/apiResponse";
    import HttpStatus from "../../../constants/httpStatusCode";
    import { ORDER_ACCEPTED, ORDER_COMPLETED, ORDER_FETCH_SUCCESS, ORDER_READY } from "../../../constants/messages";
    import { AppError } from "../../../middleware/errorHandler";
import { GetWaiterOrdersQueryDTO } from "../../../dtos/order/orderReqDto";
    @injectable()
    export default class OrderController implements IOrderController {
        constructor(@inject(TYPES.OrderService) private _orderService: IOrderService) { }
        getAllOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
            try {
                const userId = req.user?.id
                const hotelId = req.hotelId
                const data = await this._orderService.getAllOrders(userId!, hotelId!)
                apiResponse(res, HttpStatus.OK, ORDER_FETCH_SUCCESS, data)
            } catch (error) {
                next(error)
            }

        }
        getAllAdminOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
            try {
                const hotelId = req.admin?.id
                const data = await this._orderService.getAllAdminOrders(hotelId!, req.query.search as string, Number(req.query.page))
                apiResponse(res, HttpStatus.OK, ORDER_FETCH_SUCCESS, data)
            } catch (error) {
                next(error)
            }

        }
        getOneOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                const orderId = req.params?.id
                if (!orderId) {
                    throw new AppError('orderId is missing', HttpStatus.NOT_FOUND)
                }
                const data = await this._orderService.getOneOrder(orderId as string)
                apiResponse(res, HttpStatus.OK, ORDER_FETCH_SUCCESS, data)
            } catch (error) {
                next(error)
            }
        }
        getNewOrders=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
            try {
                const hotelId=req.hotelId
                const resData=await this._orderService.getNewOrders(hotelId!)
                apiResponse(res,HttpStatus.OK,'success',resData)
                
            } catch (error) {
                next(error)
            }
        }
        getAccpetedOrders=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
            try {
                const hotelId=req.hotelId
                const chefId=req.staff?.id
                const resData=await this._orderService.getAccpetedOrders(hotelId!,chefId!)
                apiResponse(res,HttpStatus.OK,'success',resData)
                
            } catch (error) {
                next(error)
            }
        }
        getReadyOrders=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
            try {
                const hotelId=req.hotelId
                const chefId=req.staff?.id
                const resData=await this._orderService.getReadyOrders(hotelId!,chefId!)
                apiResponse(res,HttpStatus.OK,'success',resData)
                
            } catch (error) {
                next(error)
            }
        }
        
        accpetOrder=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
            try {
                const hoetelId=req.hotelId
                const orderId=req.params.orderId as string
                const chefId=req.staff?.id
                await this._orderService.accpetOrder(hoetelId!,orderId,chefId!)
                apiResponse(res,HttpStatus.OK,ORDER_ACCEPTED)
            } catch (error) {
                next(error)
            }
        }
        markOrderReady=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
            try {
                
                const hoetelId=req.hotelId
                const orderId=req.params.orderId as string
                const chefId=req.staff?.id
                await this._orderService.markOrderReady(hoetelId!,orderId,chefId!)
                apiResponse(res,HttpStatus.OK,ORDER_READY)
            } catch (error) {
                next(error)
            }
        }
         getwithoutCompleteOrderWaiter=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
            try {
                
                const hotelId=req.hotelId
                const page=Number(req.query.page)
                const resData=await this._orderService.getwithoutCompleteOrderWaiter(hotelId!,page)
                apiResponse(res,HttpStatus.OK,'success',resData)

            } catch (error) {
                next(error)
            }
        }
        getQuickItemOrderWaiter=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
             try {
                const hotelId=req.hotelId
                const resData=await this._orderService.getQuickOrderWaiter(hotelId!)
                apiResponse(res,HttpStatus.OK,'success',resData)

            } catch (error) {
                next(error)
            }
        }
        markOrderCompleate=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
             try {
                const hoetelId=req.hotelId
                const orderId=req.params.orderId as string
                const waiterId=req.staff?.id
                await this._orderService.markOrderCompleated(hoetelId!,orderId,waiterId!)
                apiResponse(res,HttpStatus.OK,ORDER_COMPLETED)
            } catch (error) {
                next(error)
            }
        }
        markOrderPicked=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
             try {
                const hoetelId=req.hotelId
                const orderId=req.params.orderId as string
                const waiterId=req.staff?.id
                await this._orderService.markOrderPicked(hoetelId!,orderId,waiterId!)
                apiResponse(res,HttpStatus.OK,ORDER_COMPLETED)
            } catch (error) {
                next(error)
            }
        }
        getCompletedOrderWaiter=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
            try {
                const query=req.query as unknown as GetWaiterOrdersQueryDTO
                const hoetelId=req.hotelId
                const chefId=req.staff?.id
                const resData =await this._orderService.getCompleteOrderWaiter(hoetelId!,chefId!,query)
                 apiResponse(res,HttpStatus.OK,'success',resData)
            } catch (error) {
                next(error)
            }
        }
        getCompletedOrders=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void>=> {
            try {
                 const query=req.query as unknown as GetWaiterOrdersQueryDTO
                const hotelId=req.hotelId
                const chefId=req.staff?.id
                const resData=await this._orderService.getCompletedOrders(hotelId!,chefId!,query)
                apiResponse(res,HttpStatus.OK,'success',resData)
                
            } catch (error) {
                next(error)
            }
        }
        getReadyToServerWaiter=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
            try {
                const hotelId=req.hotelId
                const waiterId=req.staff?.id
                const resData=await this._orderService.getReadyToServeOrders(hotelId!,waiterId!)
                apiResponse(res,HttpStatus.OK,'success',resData)
                
            } catch (error) {
                next(error)
            }
        }
        getPickedOrderWaiter=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
            try {
                const hotelId=req.hotelId
                const waiterId=req.staff?.id
                const resData=await this._orderService.getPickedOrders(hotelId!,waiterId!)
                apiResponse(res,HttpStatus.OK,'success',resData)
                
            } catch (error) {
                next(error)
            }
        }
        markMainOrderCompleated=async(req: AuthRequest, res: Response, next: NextFunction): Promise<void> =>{
            try {
                const hotelId=req.hotelId
                const orderId=req.params.id as string
                if(!hotelId||!orderId){
                    throw new AppError('orderId is missing',HttpStatus.CONFLICT)
                }
                const resData=await this._orderService.markMainOrderCompleted(hotelId,orderId)
                if(!resData){
                    throw new AppError('something went wrong',HttpStatus.CONFLICT)
                }
                apiResponse(res,HttpStatus.OK,'success')
            } catch (error) {
                next(error)
            }
        }
    }
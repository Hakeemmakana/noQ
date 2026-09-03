import { NextFunction, Request, Response } from "express";

export default interface IOrderController {
    getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllAdminOrders(req: Request, res: Response, next: NextFunction): Promise<void>
    getOneOrder(req: Request, res: Response, next: NextFunction): Promise<void>
    //chef get request
    getNewOrders(req: Request, res: Response, next: NextFunction): Promise<void>
    getAccpetedOrders(req: Request, res: Response, next: NextFunction): Promise<void>
    getCompletedOrders(req: Request, res: Response, next: NextFunction): Promise<void>
    // chef patch
    accpetOrder(req: Request, res: Response, next: NextFunction): Promise<void>
    markOrderReady(req: Request, res: Response, next: NextFunction): Promise<void>
    // waiter get
    getCompletedOrderWaiter(req: Request, res: Response, next: NextFunction): Promise<void>
    getwithoutCompleteOrderWaiter(req: Request, res: Response, next: NextFunction): Promise<void>
    getQuickItemOrderWaiter(req: Request, res: Response, next: NextFunction): Promise<void>
    getPickedOrderWaiter(req: Request, res: Response, next: NextFunction): Promise<void>
    getReadyToServerWaiter(req: Request, res: Response, next: NextFunction): Promise<void>
    // waiter patch
    markOrderCompleate(req: Request, res: Response, next: NextFunction): Promise<void>
    markOrderPicked(req: Request, res: Response, next: NextFunction): Promise<void>
    // chef and waiter get
    getReadyOrders(req: Request, res: Response, next: NextFunction): Promise<void>
    markMainOrderCompleated(req:Request,res:Response,next:NextFunction):Promise<void>;
}
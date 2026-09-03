import { Router } from "express";
import { verifyWaiter } from "../middleware/jwt";
import { container } from "../DI/container";
import IOrderController from "../controllers/order/interface/IOrderController";
import { TYPES } from "../DI/types";
import { INotificationController } from "../controllers/notification/interface/INotificationController";


const router=Router()
router.use(verifyWaiter)

const orderController=container.get<IOrderController>(TYPES.OrderController)
router.get('/orders/without-complete',orderController.getwithoutCompleteOrderWaiter)
router.get('/orders/quickItem',orderController.getQuickItemOrderWaiter)
router.get('/orders/readyToServe',orderController.getReadyToServerWaiter)
router.get('/orders/picked',orderController.getPickedOrderWaiter)
router.get('/orders/completed',orderController.getCompletedOrderWaiter)

router.patch('/orders/:orderId/completed',orderController.markOrderCompleate)
router.patch('/orders/:orderId/picked',orderController.markOrderPicked)

//Notificaiton
const notificationController=container.get<INotificationController>(TYPES.NotificationController)
router.get('/notification',notificationController.getWaiterNotification)
router.patch('/notification/:id',notificationController.markNotificationAsRead)
router.patch('/allNotification',notificationController.markNotificationAsAllRead)


export default router
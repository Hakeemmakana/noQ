import { Router } from "express";
import { container } from "../DI/container";
import IOrderController from "../controllers/order/interface/IOrderController";
import { TYPES } from "../DI/types";
import { verifyCheff } from "../middleware/jwt";
import { INotificationController } from "../controllers/notification/interface/INotificationController";


const router=Router()

const orderController=container.get<IOrderController>(TYPES.OrderController)
router.use(verifyCheff)
router.get('/orders/new',orderController.getNewOrders)
router.get('/orders/accepted',orderController.getAccpetedOrders)
router.get('/orders/readyToServe',orderController.getReadyOrders)
router.get('/orders/completed',orderController.getCompletedOrders)

router.patch('/orders/:orderId/accept',orderController.accpetOrder)
router.patch('/orders/:orderId/readyToServe',orderController.markOrderReady)

//Notification
const notificationController=container.get<INotificationController>(TYPES.NotificationController)
router.get('/notification',notificationController.getChefNotification)
router.patch('/notification/:id',notificationController.markNotificationAsRead)
router.patch('/allNotification',notificationController.markNotificationAsAllRead)






export default router
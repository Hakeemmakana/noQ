import { Router } from 'express'
import { IMenuItemController } from "../controllers/menu/interface/IMenuController";
import { identifyTenant } from "../middleware/identifyTenant";
import { container } from '../DI/container';
import { TYPES } from '../DI/types';
import ICartController from '../controllers/cart/interface/ICartController';
import { ICategoryController } from '../controllers/category/interfaces/ICatetoryController';
import ICheckoutController from '../controllers/checkout/interface/ICheckoutController';
import IOrderController from '../controllers/order/interface/IOrderController';
const router = Router({ mergeParams: true })


const menuItemController = container.get<IMenuItemController>(TYPES.MenuItemController)
router.use(identifyTenant)
router.get('/menu', menuItemController.getAllMenuUserSide)

const cartController = container.get<ICartController>(TYPES.CartController)
router.post('/addToCart', cartController.addToCart)
router.get('/cart', cartController.getCart)
router.get('/cartWithProduct', cartController.getCartWithProduct)
router.patch('/removeFromCart/:id', cartController.removeFromCart)
router.patch('/deleteProductFromCart/:id', cartController.deleteProductFromCart)

const categoryController = container.get<ICategoryController>(TYPES.CategoryController)
router.get('/category', categoryController.getAllCategoryForUser)

// checkout
const checkoutController = container.get<ICheckoutController>(TYPES.CheckoutController)
router.route('/checkout')
    .get(checkoutController.getCheckout)
    .post(checkoutController.createOrder)
// order
const orderController = container.get<IOrderController>(TYPES.OrderController)
router.get('/orders', orderController.getAllOrders)
router.get('/order/:id', orderController.getOneOrder)


export default router
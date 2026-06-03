import { Router } from 'express'
import { IMenuItemController } from "../controllers/menu/interface/IMenuController";
import { identifyTenant } from "../middleware/identifyTenant";
import { container } from '../DI/container';
import { TYPES } from '../DI/types';
import ICartController from '../controllers/cart/interface/ICartController';
import { ICategoryController } from '../controllers/category/interfaces/ICatetoryController';
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



export default router
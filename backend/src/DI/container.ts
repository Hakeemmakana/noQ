import { AuthController } from '../controllers/auth/implementation/authController'
import IAuthController from '../controllers/auth/interface/IAuthController'
import { AuthRepository } from '../repositories/auth/implementation/authRepository'
import { IAuthRepository } from '../repositories/auth/interface/IAuthRepository'
import { EmailService } from '../services/emailService/implementaion/emailService'
import { IEmailService } from '../services/emailService/interface/IEmailService'
import { AuthService } from '../services/auth/implementation/authService'
import { IAuthService } from '../services/auth/interface/IAuthService'
import {TYPES} from './types'
import { Container } from 'inversify'
import { IUserRepository } from '../repositories/user/interface/IUserRepository'
import  UserRepository from '../repositories/user/implementation/userRepository'
import IUserService from '../services/user/interface/IUserService'
import  UserService  from '../services/user/implementation/userService'
import IUserController from '../controllers/user/interface/IUserController'
import UserController from '../controllers/user/implementatoin/userController'
import IAdminAuthController from '../controllers/adminAuth/interface/IAdminAuthController'
import  IAdminAuthRepository  from '../repositories/adminAuth/interface/IAdminAuthRepository'
import  AdminAuthRepository  from '../repositories/adminAuth/implemetation/adminAuthRepository'
import  AdminAuthController  from '../controllers/adminAuth/implementation/adminAuthController'
import IAdminAuthService from '../services/adminAuth/interface/IAdminAuthService'
import AdminAuthService from '../services/adminAuth/implementation/adminAuthService'
import ICategoryRepository from '../repositories/category/interfaces/ICategoryRepository'
import CategoryRepository from '../repositories/category/implementation/categoryRepository'
import { ICategoryController } from '../controllers/category/interfaces/ICatetoryController'
import CategoryController from '../controllers/category/implementation/categoryController'
import { IStaffRepository } from '../repositories/staff/interfaces/IStaffRepository'
import StaffRepository from '../repositories/staff/implementation/staffRepository'
import { IStaffController } from '../controllers/staff/interfaces/IStaffController'
import StaffController from '../controllers/staff/implementation/staffController'
import { ITableRepository } from '../repositories/table/interfaces/ITableRepository'
import TableRepository from '../repositories/table/implementation/tableRepository'
import { ITableController } from '../controllers/table/interfaces/ITableController'
import TableController from '../controllers/table/implementation/tableController'
import ICategoryService from '../services/category/interfaces/ICategoryService'
import IStaffService from '../services/staff/interfaces/IStaffService'
import ITableService from '../services/table/interfaces/ITableService'
import CategoryService from '../services/category/implementation/categoryService'
import TableService from '../services/table/implementation/tableService'
import StaffService from '../services/staff/implementation/staffService'
import IMediaService from '../services/mediaService/interface/IMediaService'
import S3MediaService from '../services/mediaService/implementation/S3MediaService'
import IHotelAdminRepository from '../repositories/hotelAdmin/interface/IHotelAdminRepository'
import HotelAdminRepository from '../repositories/hotelAdmin/implelmentation/hotelAdminRepository'
import IHotelAdminService from '../services/hotelAdmin/interface/IHotelAdminService'
import HotelAdminService from '../services/hotelAdmin/implelmentation/hotelAdminservice'
import IHotelAdminController from '../controllers/hotelAdmin/interface/IHotelAdminController'
import HotelAdminController from '../controllers/hotelAdmin/implelmentation/hotelAdminController'
import IMenuRepository from '../repositories/menu/interface/IMenuRespository'
import MenuItemRepository from '../repositories/menu/implementation/menuRepository'
import IMenuItemService from '../services/menu/interface/IMenuService'
import MenuItemService from '../services/menu/implementation/menuService'
import { IMenuItemController } from '../controllers/menu/interface/IMenuController'
import MenuItemController from '../controllers/menu/implements/menuController'
import { ICartRepository } from '../repositories/cart/interface/ICartRepository'
import CartRepository from '../repositories/cart/implementation/cartRepository'
import ICartService from '../services/cart/interface/ICartService'
import CartService from '../services/cart/implementation/cartService'
import ICartController from '../controllers/cart/interface/ICartController'
import cartController from '../controllers/cart/implementation/cartController'
import ICheckoutService from '../services/chekout/interface/ICheckoutService'
import CheckoutService from '../services/chekout/implementation/checkoutService'
import ICheckoutController from '../controllers/checkout/interface/ICheckoutController'
import checkoutController from '../controllers/checkout/implementation/checkoutController'
import IPaymentGateway from '../services/paymentServic/interface/IPaymentGateway'
import { StripePaymentGateway } from '../services/paymentServic/implementation/stripePaymentGateway'
import IOrderRepository from '../repositories/order/interface/IOrderRepository'
import IOrderService from '../services/order/interface/IOrderService'
import OrderService from '../services/order/implementation/orderService'
import IOrderController from '../controllers/order/interface/IOrderController'
import OrderController from '../controllers/order/implementation/orderController'
import OrderRepository from '../repositories/order/implementation/orderRepository'
import OrderItemRepository from '../repositories/orderItems/implementation/OrderItemRepository'
import IOrderItemRepository from '../repositories/orderItems/interfaces/IOrderItemRepository'
import StaffAuthController from '../controllers/staffAuth/implementation/staffAuthController'
import StaffAuthRepository from '../repositories/staffAuth/implementation/staffAuthRepository'
import IStaffAuthRepository from '../repositories/staffAuth/interface/IStaffAuthRepository'
import IStaffAuthService from '../services/staffAuth/interface/IStaffAuthService'
import StaffAuthService from '../services/staffAuth/implementation/staffAuthService'
import IStaffAuthController from '../controllers/staffAuth/interface/IStaffAuthController'
import ISocketService from '../services/soketService/interface/ISocketService'
import SocketService from '../services/soketService/implementation/SocketSerice'
import { INotificationRepository } from '../repositories/notification/interface/INotificationRepository'
import NotificationRepository from '../repositories/notification/implementation/notificationRepository'
import NotificationService from '../services/notificationService/implementation/NotificationService'
import INotificationService from '../services/notificationService/interface/INotifactionService'
import { INotificationController } from '../controllers/notification/interface/INotificationController'
import notificationController from '../controllers/notification/implementation/notificationController'
import IReportController from '../controllers/report/interface/IReportController'
import reportController from '../controllers/report/implementation/reportController'
import IReportService from '../services/report/interface/IReportService'
import ReportService from '../services/report/implementation/reportService'


const container=new Container()


//Authentication
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository)
container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)

//EmailService
container.bind<IEmailService>(TYPES.EmailService).to(EmailService)
//Media
container.bind<IMediaService>(TYPES.MediaService).to(S3MediaService)
//payment
container.bind<IPaymentGateway>(TYPES.PaymentService).to(StripePaymentGateway)

//User
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IUserController>(TYPES.UserController).to(UserController)
//AdminAuth
container.bind<IAdminAuthRepository>(TYPES.AdminAuthRepository).to(AdminAuthRepository)
container.bind<IAdminAuthService>(TYPES.AdminAuthService).to(AdminAuthService)
container.bind<IAdminAuthController>(TYPES.AdminAuthController).to(AdminAuthController)
//category
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)
//Staff
container.bind<IStaffRepository>(TYPES.StaffRepository).to(StaffRepository)
container.bind<IStaffService>(TYPES.StaffService).to(StaffService)
container.bind<IStaffController>(TYPES.StaffController).to(StaffController)
//Table
container.bind<ITableRepository>(TYPES.TableRepository).to(TableRepository)
container.bind<ITableService>(TYPES.TableService).to(TableService)
container.bind<ITableController>(TYPES.TableController).to(TableController)
//HotelAdmin
container.bind<IHotelAdminRepository>(TYPES.HotelAdminRepository).to(HotelAdminRepository)
container.bind<IHotelAdminService>(TYPES.HotelAdminService).to(HotelAdminService)
container.bind<IHotelAdminController>(TYPES.HotelAdminController).to(HotelAdminController)

//menuItems
container.bind<IMenuRepository>(TYPES.MenuItemRepository).to(MenuItemRepository)
container.bind<IMenuItemService>(TYPES.MenuItemService).to(MenuItemService)
container.bind<IMenuItemController>(TYPES.MenuItemController).to(MenuItemController)

//cart 
container.bind<ICartRepository>(TYPES.CartRepository).to(CartRepository)
container.bind<ICartService>(TYPES.CartService).to(CartService)
container.bind<ICartController>(TYPES.CartController).to(cartController)

// checkout
container.bind<ICheckoutService>(TYPES.CheckoutService).to(CheckoutService)
container.bind<ICheckoutController>(TYPES.CheckoutController).to(checkoutController)

//order
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository)
container.bind<IOrderService>(TYPES.OrderService).to(OrderService)
container.bind<IOrderController>(TYPES.OrderController).to(OrderController)

//orderItem
container.bind<IOrderItemRepository>(TYPES.OrderItemRepository).to(OrderItemRepository)

//staffAuth
container.bind<IStaffAuthRepository>(TYPES.StaffAuthRepository).to(StaffAuthRepository)
container.bind<IStaffAuthService>(TYPES.StaffAuthService).to(StaffAuthService)
container.bind<IStaffAuthController>(TYPES.StaffAuthController).to(StaffAuthController)
//socket
container.bind<ISocketService>(TYPES.SocketService).to(SocketService).inSingletonScope()
//notification
container.bind<INotificationRepository>(TYPES.NotificationRepository).to(NotificationRepository)
container.bind<INotificationService>(TYPES.NotificationService).to(NotificationService)
container.bind<INotificationController>(TYPES.NotificationController).to(notificationController)
//dashboard and report
container.bind<IReportService>(TYPES.ReportService).to(ReportService)
container.bind<IReportController>(TYPES.ReportController).to(reportController)
export {container}
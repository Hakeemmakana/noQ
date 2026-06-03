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

const container=new Container()


//Authentication
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository)
container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)

//EmailService
container.bind<IEmailService>(TYPES.EmailService).to(EmailService)

//User
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IUserController>(TYPES.UserController).to(UserController)
//AdminAuth
container.bind<IAdminAuthRepository>(TYPES.AdminAuthRepository).to(AdminAuthRepository)
container.bind<IAdminAuthService>(TYPES.AdminAuthService).to(AdminAuthService)
container.bind<IAdminAuthController>(TYPES.AdminAuthController).to(AdminAuthController)
//Table
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
//Media
container.bind<IMediaService>(TYPES.MediaService).to(S3MediaService)
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
export {container}
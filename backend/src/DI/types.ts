
export const TYPES = {
    // Authentication 
    AuthRepository: Symbol.for('AuthRepository'),
    AuthService: Symbol.for('AuthService'),
    AuthController: Symbol.for('AuthController'),

    // Email
    EmailService: Symbol.for('EmailService'),
    //Media
    MediaService: Symbol.for('MediaService'),
    //payment 
    PaymentService:Symbol.for('PaymentService'),

    //User
    UserRepository: Symbol.for('UserRepository'),
    UserService: Symbol.for('UserService'),
    UserController: Symbol.for('UserController'),

    //AdminAuth
    AdminAuthRepository: Symbol.for('AdminAuthRepository'),
    AdminAuthService: Symbol.for('AdminAuthService'),
    AdminAuthController: Symbol.for('AdminAuthController'),

    // Table
    TableRepository: Symbol.for('TableRepository'),
    TableService: Symbol.for('TableService'),
    TableController: Symbol.for('TableController'),
    //Category
    CategoryRepository: Symbol.for('CategoryRepository'),
    CategoryService: Symbol.for('CategoryService'),
    CategoryController: Symbol.for('CategoryController'),
    //staff
    StaffRepository: Symbol.for('StaffRepository'),
    StaffService: Symbol.for('StaffService'),
    StaffController: Symbol.for('StaffController'),


    //HotelAdmin
    HotelAdminRepository: Symbol.for('HotelAdminRepository'),
    HotelAdminService: Symbol.for('HotelAdminService'),
    HotelAdminController: Symbol.for('HotelAdminController'),

    //menuItems
    MenuItemRepository: Symbol.for('MenuItemRepository'),
    MenuItemService: Symbol.for('MenuItemService'),
    MenuItemController: Symbol.for('MenuItemController'),

    //cart
    CartRepository:Symbol.for('CartRepository'),
    CartService:Symbol.for('CartService'),
    CartController:Symbol.for('CartController'),

    // checkout
    CheckoutService:Symbol.for('CheckoutService'),
    CheckoutController:Symbol.for('CheckoutController'),
    
    // order
    OrderRepository:Symbol.for('OrderRepository'),
    OrderService:Symbol.for('OrderService'),
    OrderController:Symbol.for('OrderController')



}
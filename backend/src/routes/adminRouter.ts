import { Router } from "express";
import { container } from "../DI/container";
import IUserController from "../controllers/user/interface/IUserController";
import { TYPES } from "../DI/types";
import { ICategoryController } from "../controllers/category/interfaces/ICatetoryController";
import { verifyAdmin } from "../middleware/jwt";
import { ITableController } from "../controllers/table/interfaces/ITableController";
import { IStaffController } from "../controllers/staff/interfaces/IStaffController";
import IHotelAdminController from "../controllers/hotelAdmin/interface/IHotelAdminController";
import upload from "../middleware/multerMiddleware";
import { IMenuItemController } from "../controllers/menu/interface/IMenuController";
const router= Router()
//user
router.use(verifyAdmin)
const userController=container.get<IUserController>(TYPES.UserController)
router.route('/users').get(userController.getAllUsers)
router.patch("/users/:id/status", userController.statusChange)
router.patch("/users/:id/soft-delete", userController.deleteUser)

//category
const categoryController=container.get<ICategoryController>(TYPES.CategoryController)
router.route('/category')
        .get(categoryController.getAllCategory)
        .post(categoryController.createCategory)
router.route('/category/:id')
    .patch(categoryController.statusChangeCategory)
    .delete(categoryController.deleteCategory)
    .put(categoryController.updateCategory)

//table
const tableController=container.get<ITableController>(TYPES.TableController)
router.route('/table')
  .get(tableController.getAllTable)
  .post(tableController.createTable)
router.route('/table/:id')
  .patch(tableController.statusChangeTable)
  .delete(tableController.deleteTable)
  .put(tableController.updateTable)
//staff
const staffController=container.get<IStaffController>(TYPES.StaffController)
router.route('/staff')
  .get(staffController.getAllStaff)
  .post(staffController.createStaff);
router.route('/staff/:id')
  .patch(staffController.statusChangeStaff)
  .delete(staffController.deleteStaff)
  .put(staffController.updateStaff);

//profile
const hotelAdminController=container.get<IHotelAdminController>(TYPES.HotelAdminController)
router.route('/profile')
            .get(hotelAdminController.getAdminProfile)
            .patch(hotelAdminController.updateAdminProfile)
    router.patch('/profile/profilePhotoChange',upload.single('image'),hotelAdminController.updateAdminProfilePicture)

//menuItem
const menuItemController=container.get<IMenuItemController>(TYPES.MenuItemController)
router.route('/menu')
          .get(menuItemController.getAllMenuItems)
          .post(upload.single('productImage'),menuItemController.createMenuItem)
router.route('/menu/:id')
          .put(upload.single('productImage'),menuItemController.updateMenuItem)
          .delete(menuItemController.deleteMenuItem)

export default router
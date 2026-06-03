    import { Router } from "express";
import { container } from "../DI/container";
import { ITableController } from "../controllers/table/interfaces/ITableController";
import { TYPES } from "../DI/types";
import IUserController from "../controllers/user/interface/IUserController";
import { verifyUser } from "../middleware/jwt";
import IAuthController from "../controllers/auth/interface/IAuthController";
import upload from "../middleware/multerMiddleware";

    const router =Router()
    router.use(verifyUser)
    // router.route('/home').get()
    const tableController=container.get<ITableController>(TYPES.TableController)
    router.route('/table/:hotelId/:tableId').get(tableController.getTable)

    //profile section
    const userController=container.get<IUserController>(TYPES.UserController)
    router.route('/profile')
            .get(userController.getUserProfile)
            .patch(userController.updateUserProfile)
    router.patch('/profile/profilePhotoChange',upload.single('image'),userController.updateUserProfilePicture)
    //atuth
    const authController=container.get<IAuthController>(TYPES.AuthController)
    router.post('/profile/requestOtp',authController.forgotPassword)
    router.post('/profile/verifyOtp',authController.verifyOtp)
    router.post('/profile/resentOtp',authController.resendOtp)
    router.post('/profile/resetPassword',authController.resetPassword)

   



    export default router
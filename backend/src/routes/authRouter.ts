import { Router } from "express";
import {container} from '../DI/container'
import {TYPES} from '../DI/types'
import IAuthController from "../controllers/auth/interface/IAuthController";
import IAdminAuthController from "../controllers/adminAuth/interface/IAdminAuthController";
import IStaffAuthController from "../controllers/staffAuth/interface/IStaffAuthController";
const router=Router()

const authController =container.get<IAuthController>(TYPES.AuthController)
// User auth routes
router.route('/register').post(authController.register)
router.route('/verifyOtp').post(authController.verifyOtp)
router.route('/resendOtp').post(authController.resendOtp)
router.route('/forgetPassword').post(authController.forgotPassword)
router.route('/resetPassword').post(authController.resetPassword)
router.route('/login').post(authController.login)
router.route('/userLogout').post(authController.userLogout)
router.route('/googleAuth').post(authController.googleAuth)
router.route('/refresh-token').post(authController.userRefreshToken)

const adminAuthController=container.get<IAdminAuthController>(TYPES.AdminAuthController)
//admin auth routes

router.route('/adminLogin').post(adminAuthController.login)
router.route('/adminLogout').post(adminAuthController.logout)
router.route('/admin-refresh-token').post(adminAuthController.adminRefreshToken)

const staffAuthController=container.get<IStaffAuthController>(TYPES.StaffAuthController)
//staff auth routes
 router.route('/staffLogin').post(staffAuthController.login)
 router.route('/staffLogout').post(staffAuthController.logout)
 router.route('/staff-refresh-token').post(staffAuthController.staffRefreshToken)

export default router
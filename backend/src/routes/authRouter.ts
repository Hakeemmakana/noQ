import { Router } from "express";
import {container} from '../DI/container'
import {TYPES} from '../DI/types'
import IAuthController from "../controllers/auth/interface/IAuthController";
const router=Router()

const authController =container.get<IAuthController>(TYPES.AuthController)
router.route('/register').post(authController.register)
router.route('/verifyOtp').post(authController.verifyOtp)
router.route('/resendOtp').post(authController.resendOtp)
router.route('/forgetPassword').post(authController.forgotPassword)
router.route('/resetPassword').post(authController.resetPassword)
router.route('/login').post(authController.login)
router.route('/adminLogout').post(authController.AdminLogout)
router.route('/userLogout').post(authController.userLogout)
router.route('/googleAuth').post(authController.googleAuth)


export default router
import { Router } from "express";
import {container} from '../DI/container'
import {TYPES} from '../DI/types'
import IAuthController from "../controllers/auth/interface/IAuthController";
const router=Router()

const authController =container.get<IAuthController>(TYPES.AuthController)
router.route('/register').post(authController.register)
router.route('/verifyOtp').post(authController.verifyOtp)


export default router
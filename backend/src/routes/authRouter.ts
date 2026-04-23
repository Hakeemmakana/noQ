import { Router } from "express";
import { AuthController } from "../controllers/auth/implementation/authController";
import { AuthService } from "../services/auth/implementation/authService";
import {container} from '../DI/container'
import {TYPES} from '../DI/types'
import IAuthController from "../controllers/auth/interface/IAuthController";
const router=Router()

    const authController =container.get<IAuthController>(TYPES.AuthController)
    console.log(authController)
    router.route('/register').post(authController.register)

// router.post('/register', authController.register.bind(authController))


export default router
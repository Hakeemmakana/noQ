import { Router } from "express";
import { container } from "../DI/container";
import IUserController from "../controllers/user/interface/IUserController";
import { TYPES } from "../DI/types";
const router= Router()
const userController=container.get<IUserController>(TYPES.UserController)
router.route('/users').get(userController.getAllUsers)
router.patch("/users/:id/status", userController.statusChange)
router.patch("/users/:id/soft-delete", userController.deleteUser)



export default router
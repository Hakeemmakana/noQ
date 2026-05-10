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
export {container}
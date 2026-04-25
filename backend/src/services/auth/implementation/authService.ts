import redisClient from "../../../config/redis"
import HttpStatus from "../../../constants/httpStatusCode"
import { OTP_SENT_SUCCESSFULLY, REGISTRATION_ALREADY_INITATED, USER_ALREADY_EXISTS } from "../../../constants/messages"
import { AppError } from "../../../middleware/errorHandler"
import bcrypt from 'bcrypt'
import { IAuthService } from "../interface/IAuthService"
import { inject, injectable } from "inversify"
import { generateOtp } from "../../../utils/generateOtp"
import { TYPES } from "../../../DI/types"
import {IEmailService}from '../../emailService/interface/IEmailService'
    const saltRounds=Number(process.env.BCRYPT_SALT_ROUNDS||10)
@injectable()
export class AuthService implements IAuthService{
    constructor(
         @inject(TYPES.EmailService) private _emailService:IEmailService
         
    ){
    }

    async register(name: string,email: string,phone: string,password: string):Promise<{message:string}>{
        // const existUser=this.authRepository.findByEmail(email)
        // if(existUser){
        //     throw new AppError(USER_ALREADY_EXISTS,HttpStatus.CONFLICT,)
        // }
        const redisDataKey=`userData:${email}`
        const redisOtpKey=`otp:${email}`
        const initiatedProcess=await redisClient.get(redisDataKey)
        if(initiatedProcess){
            // throw new AppError(REGISTRATION_ALREADY_INITATED,HttpStatus.CONFLICT)
        }
        const hashedPassword=await bcrypt.hash(password,saltRounds)
        const {otp,hashedOtp}=generateOtp()
        const userData={
            name,
            email,
            phone,
            password
        }
        await redisClient.setEx(redisDataKey,600,JSON.stringify(userData))
        await redisClient.setEx(redisOtpKey,120,hashedOtp)
        await this._emailService.sendOtpMail(email,otp)
        return {message:OTP_SENT_SUCCESSFULLY}
        

    }
}
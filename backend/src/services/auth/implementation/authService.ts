import redisClient from "../../../config/redis"
import HttpStatus from "../../../constants/httpStatusCode"
import { REGISTRATION_ALREADY_INITATED, USER_ALREADY_EXISTS } from "../../../constants/messages"
import { AppError } from "../../../middleware/errorHandler"
import bcrypt from 'bcrypt'
import { IAuthService } from "../interface/IAuthService"
import { injectable } from "inversify"
import { generateOtp } from "../../../utils/generateOtp"
    const saltRounds=Number(process.env.BCRYPT_SALT_ROUNDS||10)
@injectable()
export class AuthService implements IAuthService{
    constructor(){
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
            throw new AppError(REGISTRATION_ALREADY_INITATED,HttpStatus.CONFLICT)
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
        console.log(hashedPassword,password)
        return {message:"success"}

    }
}
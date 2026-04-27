import redisClient from "../../../config/redis"
import HttpStatus from "../../../constants/httpStatusCode"
import { INVALID_OTP, OTP_EXPIRED, OTP_SENT_SUCCESSFULLY, OTP_VERIFIED_SUCCESSFULLY,
         REGISTRATION_ALREADY_INITATED, SIGNUP_SESSION_EXPIRED, USER_ALREADY_EXISTS,
         USER_NOT_FOUND,
          } from "../../../constants/messages"
import { AppError } from "../../../middleware/errorHandler"
import bcrypt from 'bcrypt'
import { IAuthService } from "../interface/IAuthService"
import { inject, injectable } from "inversify"
import { generateOtp } from "../../../utils/generateOtp"
import { TYPES } from "../../../DI/types"
import { IEmailService } from '../../emailService/interface/IEmailService'
import crypto from 'crypto'
import { IAuthRepository } from "../../../repositories/auth/interface/IAuthRepository"
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10)
@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(TYPES.EmailService) private _emailService: IEmailService,
        @inject(TYPES.AuthRepository) private _authRepository:IAuthRepository

    ) {
    }

    async register(name: string, email: string, phone: string, password: string): Promise<{ message: string }> {
        const existUser=await this._authRepository.findByEmail(email);
        if(existUser){
            throw new AppError(USER_ALREADY_EXISTS,HttpStatus.CONFLICT,)
        }

        const redisDataKey = `userData:${email}`
        const redisOtpKey = `otp:${email}`
        const initiatedProcess = await redisClient.get(redisDataKey)
        if (initiatedProcess) {
            throw new AppError(REGISTRATION_ALREADY_INITATED,HttpStatus.CONFLICT)
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const { otp, hashedOtp } = generateOtp()
        const userData = {
            name,
            email,
            phone,
            password:hashedPassword
        }
        await redisClient.setEx(redisDataKey, 600, JSON.stringify(userData))
        await redisClient.setEx(redisOtpKey, 120, hashedOtp)
        await this._emailService.sendOtpMail(email, otp)  

        return { message: OTP_SENT_SUCCESSFULLY }


    }
    verifyOtp = async (email: string, otp: string, purpose: string) => {
    
        const redisOtpKey = `otp:${email}`
        const redisDataKey = `userData:${email}`

        const storedOtp = await redisClient.get(redisOtpKey)
        if (!storedOtp) {
            throw new AppError(OTP_EXPIRED, HttpStatus.BAD_REQUEST,)
        }
        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
        if (hashedOtp !== storedOtp) {
            throw new AppError(INVALID_OTP, HttpStatus.BAD_REQUEST)
        }
        const response = {
            message: OTP_VERIFIED_SUCCESSFULLY,
            token: '',
            userId: ''
        }
        switch (purpose) {
            case 'register': {
                const userData = await redisClient.get(redisDataKey);
                if (!userData){
                    throw new AppError(SIGNUP_SESSION_EXPIRED, HttpStatus.BAD_REQUEST);
                } 
                const { user } = await this._authRepository.register(JSON.parse(userData));
                response.userId=user._id.toString();
                break;
            }
            case 'other':{
                // const user=await this.authRepository.findByEmail(email)
                // if(!user){
                //     throw new AppError(USER_NOT_FOUND,HttpStatus.NOT_FOUND);
                // }
                // const token=generateResetTocken(user._id.toString());
                // response.token=token;
                // break;
            }
        }
        await redisClient.del(redisOtpKey)
        await redisClient.del(redisDataKey)
        return response
    }
    forgetPassword=async(email: string): Promise<{status:number, message: string }> =>{
        const user=await this._authRepository.findByEmail(email)
        if(!user){
            throw new AppError(USER_NOT_FOUND,HttpStatus.NOT_FOUND)
        }
        const {otp,hashedOtp}=generateOtp()
        const redisOtpKey=`email:${hashedOtp}`;
        await redisClient.setEx(redisOtpKey,120,hashedOtp)
        await this._emailService.sendOtpMail(email,otp)
        return {status:HttpStatus.OK,message:OTP_SENT_SUCCESSFULLY}
    }
    resendOtp=async(email: string, purpose: string): Promise<{ status: number; message: string }>=> {
        const redisDataKey=`userData:${email}`
        const userExist=purpose==='register'
        ? await redisClient.get(redisDataKey)
        : await this._authRepository.findByEmail(email);
        if(!userExist){
            throw new AppError(USER_NOT_FOUND,HttpStatus.NOT_FOUND)
        }
        const{otp,hashedOtp}=generateOtp()
        const redisOtpKey=`otp:${email}`
        await redisClient.setEx(redisOtpKey,120,hashedOtp)

        await this._emailService.resendOtpMail(email,otp)
        return {status:HttpStatus.OK,message:OTP_SENT_SUCCESSFULLY}
    }
}
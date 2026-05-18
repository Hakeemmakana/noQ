import redisClient from "../../../config/redis"
import HttpStatus from "../../../constants/httpStatusCode"
import {
    ACCOUNT_IS_BLOCKED, INVALID_CREDENTIALS, INVALID_OTP, INVALID_TOKEN, NO_REFRESH_TOKEN_FOUND, OTP_EXPIRED, OTP_SENT_SUCCESSFULLY, OTP_VERIFIED_SUCCESSFULLY,
    PASSWORD_NOT_SET,
    PASSWORD_RESET_SUCCESS,
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
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken, verifyResetToken } from "../../../middleware/jwt"
import { IUserMappedData, userDataMapping } from "../../../dtos/user/user-response.dto"
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10)
import axios from "axios"
import { createUserDto } from "../../../dtos/user/create-user.dto"

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(TYPES.EmailService) private _emailService: IEmailService,
        @inject(TYPES.AuthRepository) private _authRepository: IAuthRepository

    ) {
    }

    async register(userData:createUserDto): Promise<{ message: string }> {
        const {email,name,password,phone}=userData
        const existUser = await this._authRepository.findByEmail(email);
        if (existUser) {
            throw new AppError(USER_ALREADY_EXISTS, HttpStatus.CONFLICT,)
        }

        const redisDataKey = `userData:${email}`
        const redisOtpKey = `otp:${email}`
        const initiatedProcess = await redisClient.get(redisDataKey)
        if (initiatedProcess) {
            throw new AppError(REGISTRATION_ALREADY_INITATED, HttpStatus.CONFLICT)
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const { otp, hashedOtp } = generateOtp()
        const userDataToStore = {
            name,
            email,
            phone,
            password: hashedPassword
        }
        await redisClient.setEx(redisDataKey, Number(process.env.REDIS_USER_TTL), JSON.stringify(userDataToStore))
        await redisClient.setEx(redisOtpKey, Number(process.env.REDIS_OTP_TTL), hashedOtp)
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
                if (!userData) {
                    throw new AppError(SIGNUP_SESSION_EXPIRED, HttpStatus.BAD_REQUEST);
                }
                const { user } = await this._authRepository.register(JSON.parse(userData));
                response.userId = user._id.toString();
                break;
            }
            case 'reset-password': {
                const user = await this._authRepository.findByEmail(email)
                if (!user) {
                    throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
                }
                const token = generateResetToken(user._id.toString());
                response.token = token;
                break;
            }
        }
        await redisClient.del(redisOtpKey)
        await redisClient.del(redisDataKey)
        return response
    }
    forgetPassword = async (email: string): Promise<{ status: number, message: string }> => {
        const user = await this._authRepository.findByEmail(email)
        if (!user) {
            throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const { otp, hashedOtp } = generateOtp()
        const redisOtpKey = `otp:${email}`;
        await redisClient.setEx(redisOtpKey, 120, hashedOtp)
        await this._emailService.sendOtpMail(email, otp)
        return { status: HttpStatus.OK, message: OTP_SENT_SUCCESSFULLY }
    }
    resendOtp = async (email: string, purpose: string): Promise<{ status: number; message: string }> => {
        const redisDataKey = `userData:${email}`
        const userExist = purpose === 'register'
            ? await redisClient.get(redisDataKey)
            : await this._authRepository.findByEmail(email);
        if (!userExist) {
            throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const { otp, hashedOtp } = generateOtp()
        const redisOtpKey = `otp:${email}`
        await redisClient.setEx(redisOtpKey, 120, hashedOtp)

        await this._emailService.resendOtpMail(email, otp)
        return { status: HttpStatus.OK, message: OTP_SENT_SUCCESSFULLY }
    }
    login = async (email: string, password: string): Promise<{ user: IUserMappedData; accessToken: string; refreshToken: string }> => {
        const user = await this._authRepository.findByEmail(email)
        if (!user) {
            throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        if (!user.isVerified) {
            throw new AppError(ACCOUNT_IS_BLOCKED, HttpStatus.FORBIDDEN);
        }
        if (!user.password) {
            throw new AppError(PASSWORD_NOT_SET, HttpStatus.BAD_REQUEST)
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new AppError(INVALID_CREDENTIALS, HttpStatus.FORBIDDEN)
        }
        

        const role = 'user'
        const accessToken = generateAccessToken(user._id.toString(), role)
        const refreshToken = generateRefreshToken(user._id.toString(), role)
        const mappedUser = userDataMapping(user)
        return { user: mappedUser, accessToken, refreshToken }
    }
    resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
        const decode = verifyResetToken(token)
        const userId = decode.userId
        const user = await this._authRepository.findById(userId)
        if (!user) {
            throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await this._authRepository.findByIdAndUpdate(userId, { password: hashedPassword })
        return { message: PASSWORD_RESET_SUCCESS }
    }
    googleAuth = async (token: string): Promise<{ user: IUserMappedData; accessToken: string; refreshToken: string }> => {

        const response = await axios.get(process.env.GOOGLE_FETCH_USER!, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { sub, name, email, picture } = response.data;

        let user = await this._authRepository.findByEmail(email);
        if (!user) {
            const result = await this._authRepository.register({
                name,
                email,
                googleId: sub,
                imageUrl: picture,
                isAdmin: false
            })
            user = result.user
        }
        const role = user.isAdmin ? 'admin' : 'user';
        const accessToken = generateAccessToken(user._id.toString(), role)
        const refreshToken = generateRefreshToken(user._id.toString(), role)
        const mappedUser = userDataMapping(user)
        return { user: mappedUser, accessToken, refreshToken }

    }
    refreshToken=async(refreshToken: string):Promise<{ newAccessToken: string }>=> {
    if (!refreshToken)
      throw new AppError( NO_REFRESH_TOKEN_FOUND,HttpStatus.BAD_REQUEST);

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new AppError( INVALID_TOKEN,HttpStatus.FORBIDDEN);
    }

    const user = await this._authRepository.findById(decoded.id);
    if (!user) {
      throw new AppError( USER_NOT_FOUND,HttpStatus.NOT_FOUND);
    }

    if (!user.isVerified) {
      throw new AppError( ACCOUNT_IS_BLOCKED,HttpStatus.FORBIDDEN,);
    }
    const newAccessToken = generateAccessToken(decoded.id, decoded.role);

    return { newAccessToken };
  }
  
}
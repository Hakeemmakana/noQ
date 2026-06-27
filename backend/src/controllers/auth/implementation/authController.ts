import { NextFunction, Request, Response } from "express";
import IAuthController from "../interface/IAuthController";
import { validateLogin, validateRegister } from "../../../validation/authValidation";
import HttpStatus from "../../../constants/httpStatusCode";
import { AppError } from "../../../middleware/errorHandler";
import { IAuthService } from "../../../services/auth/interface/IAuthService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { emailRegex, passwordRegex } from "../../../constants/regex";
import { INVALID_EMAIL, LOGGED_IN_SUCCESS, LOGGED_OUT_MESSAGE,NO_REFRESH_TOKEN_FOUND } from "../../../constants/messages";
import { apiResponse } from "../../../utils/apiResponse";

const refreshTokenMaxAge =
    Number(process.env.REFRESH_TOKEN_MAX_AGE) || 7 * 24 * 60 * 60 * 1000;

@injectable()
export class AuthController implements IAuthController {
    constructor(@inject(TYPES.AuthService) private _authService: IAuthService) { }
    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const parsed = validateRegister(req.body)

            if (!parsed.isValid) {
                throw new AppError('validation Failed', HttpStatus.BAD_REQUEST, parsed.errors)
            }
            
            const { message } = await this._authService.register(parsed.data)
            apiResponse(res, HttpStatus.OK, message)
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsed = validateLogin(req.body)
            if (!parsed.isValid) {
                throw new AppError('Validation Failed', HttpStatus.BAD_REQUEST, parsed.errors)
            }
            const { email, password } = parsed.data
            const { user, accessToken, refreshToken } = await this._authService.login(email, password)
            
                res.cookie("user_refresh_token", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                    maxAge: refreshTokenMaxAge,
                });
            
            res.json({ user, accessToken });
        } catch (error) {
            next(error)
        }
    }
    verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, otp, purpose } = req.body
            const { message, token } = await this._authService.verifyOtp(email.trim(), otp.trim(), purpose)

            res.json({ message, token })
        } catch (error) {
            next(error)
        }
    }
    async userLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('user_refresh_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            apiResponse(res, HttpStatus.OK, LOGGED_OUT_MESSAGE)
        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const email = req.body.email.trim();
            if (!email || !emailRegex.test(email)) {
                throw new AppError(INVALID_EMAIL, HttpStatus.BAD_REQUEST);
            }
            const { status, message } = await this._authService.forgetPassword(email);
            apiResponse(res, status, message)
        } catch (error) {
            next(error)
        }
    }
    resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, purpose } = req.body;
            if (!email || !emailRegex.test(email)) {
                throw new AppError(INVALID_EMAIL, HttpStatus.BAD_REQUEST)
            }
            const { message, status } = await this._authService.resendOtp(email.trim(), purpose)
            apiResponse(res, status, message)

        } catch (error) {
            next(error)
        }
    }
    resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token, newPassword } = req.body
            if (!token || !newPassword) {
                throw new AppError('Token and new password are required', HttpStatus.BAD_REQUEST)
            }
            if (!passwordRegex.test(newPassword)) {
                throw new AppError('Enter valid password', HttpStatus.BAD_REQUEST)
            }
            const { message } = await this._authService.resetPassword(token, newPassword)
            apiResponse(res, HttpStatus.OK, message)

        } catch (error) {
            next(error)
        }

    }
    googleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token } = req.body
            const { user, accessToken, refreshToken } = await this._authService.googleAuth(token)

            res.cookie("user_refresh_token", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: refreshTokenMaxAge,
            });
            res.status(HttpStatus.OK).json({ user, accessToken, message: LOGGED_IN_SUCCESS })

        } catch (error) {
            next(error)
        }
    }
    
    userRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.user_refresh_token;

      if (!refreshToken) {
        throw new AppError( NO_REFRESH_TOKEN_FOUND,HttpStatus.UNAUTHORIZED);
      }

      const { newAccessToken } =
        await this._authService.refreshToken(refreshToken);

      res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  };



}
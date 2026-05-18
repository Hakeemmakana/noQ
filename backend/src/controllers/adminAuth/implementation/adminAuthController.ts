import { Request, Response, NextFunction } from "express";
import IAdminAuthController from "../interface/IAdminAuthController";
import HttpStatus from "../../../constants/httpStatusCode";
import { LOGGED_OUT_MESSAGE, NO_REFRESH_TOKEN_FOUND } from "../../../constants/messages";
import { validateLogin } from "../../../validation/authValidation";
import { AppError } from "../../../middleware/errorHandler";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import IAdminAuthService from "../../../services/adminAuth/interface/IAdminAuthService";
const refreshTokenMaxAge =
    Number(process.env.REFRESH_TOKEN_MAX_AGE) || 7 * 24 * 60 * 60 * 1000;
@injectable()
export default class AdminAuthController implements IAdminAuthController {
    constructor(@inject(TYPES.AdminAuthService) private _adminAutService:IAdminAuthService){}
    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsed = validateLogin(req.body)
            if (!parsed.isValid) {
                throw new AppError('Validation Failed', HttpStatus.BAD_REQUEST, parsed.errors)
            }
            const { email, password } = parsed.data
            const { user, accessToken, refreshToken } = await this._adminAutService.login(email, password)

             res.cookie("admin_refresh_token", refreshToken, {
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
    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('admin_refresh_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            res.status(HttpStatus.OK).json({ message: LOGGED_OUT_MESSAGE })
        } catch (error) {
            next(error)
        }
    }
    adminRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const refreshToken = req.cookies?.admin_refresh_token;
    
          if (!refreshToken) {
            throw new AppError( NO_REFRESH_TOKEN_FOUND,HttpStatus.UNAUTHORIZED);
          }
    
          const { newAccessToken } =
            await this._adminAutService.refreshToken(refreshToken);
    
          res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
        } catch (error) {
          next(error);
        }
      };

      
}
import { NextFunction, Request, Response } from "express";
import IStaffAuthController from "../interface/IStaffAuthController";
import { AppError } from "../../../middleware/errorHandler";
import HttpStatus from "../../../constants/httpStatusCode";
import { LOGGED_OUT_MESSAGE, NO_REFRESH_TOKEN_FOUND } from "../../../constants/messages";
import { validateLogin } from "../../../validation/authValidation";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import IStaffAuthService from "../../../services/staffAuth/interface/IStaffAuthService";
const refreshTokenMaxAge =
    Number(process.env.REFRESH_TOKEN_MAX_AGE) || 7 * 24 * 60 * 60 * 1000;
@injectable()
export default class StaffAuthController implements IStaffAuthController {
    constructor(@inject(TYPES.StaffAuthService)private _staffAutService: IStaffAuthService) { }
    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parsed = validateLogin(req.body)
            if (!parsed.isValid) {
                throw new AppError('Validation Failed', HttpStatus.BAD_REQUEST, parsed.errors)
            }
            const { email, password } = parsed.data
            const { staff, accessToken, refreshToken } = await this._staffAutService.login(email, password)

            res.cookie("staff_refresh_token", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: refreshTokenMaxAge,
            });

            res.json({ staff, accessToken });
        } catch (error) {
            next(error)
        }
    }
    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('staff_refresh_token', {
                httpOnly: true,
                secure: false,
                sameSite: 'strict'
            });
            res.status(HttpStatus.OK).json({ message: LOGGED_OUT_MESSAGE })
        } catch (error) {
            next(error)
        }
    }
    staffRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies?.staff_refresh_token;

            if (!refreshToken) {
                throw new AppError(NO_REFRESH_TOKEN_FOUND, HttpStatus.UNAUTHORIZED);
            }

            const { newAccessToken } =
                await this._staffAutService.refreshToken(refreshToken);

            res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
        } catch (error) {
            next(error);
        }
    };
}
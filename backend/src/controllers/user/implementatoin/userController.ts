import { Request, Response, NextFunction } from "express";
import IUserController from "../interface/IUserController";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import IUserService from "../../../services/user/interface/IUserService";
import HttpStatus from "../../../constants/httpStatusCode";
import { FILE_IS_REQURIED, PROFILE_UPDATE_SUCCESS, USER_DELETE_SUCCESS, USER_FETCH_SUCCESS, USER_ID_REQUIRED, USER_NOT_FOUND, USER_STATUS_UPDATE_SUCCESS, USER_UPDATE_SUCCESS, VALIDATION_FAILED } from "../../../constants/messages";
import { AuthRequest } from "../../../middleware/jwt";
import { validateUpdateProfile } from "../../../validation/updateUserValidation";
import { AppError } from "../../../middleware/errorHandler";
import { apiResponse } from "../../../utils/apiResponse";
@injectable()
export default class UserController implements IUserController {
    constructor(@inject(TYPES.UserService) private _userService: IUserService) { }
    getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = Number(req.query.page) || 1
            const search = req.query.search || ''
            const usersData = await this._userService.getAllUsers(search as string, page);
            apiResponse(res, HttpStatus.OK, USER_FETCH_SUCCESS, usersData)
        } catch (error) {
            next(error)
        }

    }
    statusChange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id as string
            const status = req.body.status

            // 1. Validate input
            if (!userId || !status) {
                throw new AppError('userId and status are required', HttpStatus.BAD_REQUEST)
            }

            // 2. Validate status
            if (!["active", "blocked"].includes(status)) {
                throw new AppError('Invalid status value', HttpStatus.BAD_REQUEST)
            }

            const updatedUser = await this._userService.statusChange(
                userId,
                status
            );
            if (!updatedUser) {
                throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
            apiResponse(res, HttpStatus.OK, USER_STATUS_UPDATE_SUCCESS, updatedUser)

        } catch (error) {
            next(error)
        }
    }
    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id as string;
            if (!userId) {
                throw new AppError(USER_ID_REQUIRED, HttpStatus.BAD_REQUEST)
            }

            const deletedUser = await this._userService.deleteUser(userId);

            if (!deletedUser) {
                throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
            apiResponse(res, HttpStatus.OK, USER_DELETE_SUCCESS)
        } catch (error) {
            next(error);
        }
    };
    updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id as string
            const { isValid, errors } = validateUpdateProfile(req.body)
            if (!isValid) {
                throw new AppError(VALIDATION_FAILED, HttpStatus.BAD_REQUEST, errors)
            }
            const user = await this._userService.updateUserProfile(userId, req.body)
            if (!user) {
                throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
            apiResponse(res, HttpStatus.OK, USER_UPDATE_SUCCESS)
        } catch (error) {
            next(error)
        }
    }
    getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id as string
            const user = await this._userService.getProfile(userId)
            if (!user) {
                throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
            apiResponse(res, HttpStatus.OK, USER_FETCH_SUCCESS, user)
        } catch (error) {
            next(error)
        }
    }
    updateUserProfilePicture = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {

            const userId = req.user?.id as string
            if (!req.file) {
                throw new AppError(FILE_IS_REQURIED, HttpStatus.BAD_REQUEST)
            }
            const updatedUser = await this._userService.updateUserProfilePicture(userId, req.file)
            if (!updatedUser) {
                throw new AppError(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
            }
            const data={imageUrl: updatedUser.imageUrl}
            apiResponse(res, HttpStatus.OK, PROFILE_UPDATE_SUCCESS, data)
            

        } catch (error) {
            next(error)
        }
    }
}
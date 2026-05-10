import { Request, Response, NextFunction } from "express";
import IUserController from "../interface/IUserController";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import IUserService from "../../../services/user/interface/IUserService";
import HttpStatus from "../../../constants/httpStatusCode";
import { USER_NOT_FOUND } from "../../../constants/messages";
@injectable()
export default class UserController implements IUserController {
    constructor(@inject(TYPES.UserService) private _userService: IUserService) { }
    getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log('dkjfdk')
            const page = Number(req.query.page) || 1
            const search = req.query.search || ''
            const usersData = await this._userService.getAllUsers(search as string, page);
            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: usersData
            });
        } catch (error) {
            console.log(error)
            next(error)
        }

    }
    statusChange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id as string
            const status = req.body.status

            // 1. Validate input
            if (!userId || !status) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "userId and status are required",
                });
                return;
            }

            // 2. Validate status
            if (!["active", "blocked"].includes(status)) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Invalid status value",
                });
                return;
            }

            const updatedUser = await this._userService.statusChange(
                userId,
                status
            );
            if (!updatedUser) {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: USER_NOT_FOUND,
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "User status updated successfully",
                data: updatedUser,
            });
        } catch (error) {
            next(error)
        }
    }
    deleteUser = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id as string;
            if (!userId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "User ID is required",
                });
                return;
            }

            const deletedUser = await this._userService.deleteUser(userId);

            if (!deletedUser) {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: USER_NOT_FOUND,
                });
                return;
            }

            res.status(HttpStatus.OK).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}
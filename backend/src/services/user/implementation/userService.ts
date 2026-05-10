import { NextFunction } from "express";
import IUserService from "../interface/IUserService";
import { inject, injectable } from "inversify";
import { IUser } from "../../../types/user";
import { TYPES } from "../../../DI/types";
import { IUserRepository } from "../../../repositories/user/interface/IUserRepository";
import { PaginatedResult } from "../../../types/pagination";

@injectable()
export default class UserService implements IUserService {
    constructor(@inject(TYPES.UserRepository) private _userRepository: IUserRepository) { }
    getAllUsers = async (search: string, page: number): Promise<PaginatedResult<IUser>> => {
        const limit = 8
        return await this._userRepository.getAllUsers(search, page, limit)
    }
    statusChange = async (userId: string, status: 'active' | 'blocked'): Promise<IUser | null> => {
        return await this._userRepository.changeStatus(userId, status)
    }
    deleteUser=async(userId: string): Promise<IUser | null> =>{
        return await this._userRepository.deleteUser(userId);

    }
}
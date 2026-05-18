
import IUserService from "../interface/IUserService";
import { inject, injectable } from "inversify";
import { IUser } from "../../../types/user";
import { TYPES } from "../../../DI/types";
import { IUserRepository } from "../../../repositories/user/interface/IUserRepository";
import { PaginatedResult } from "../../../types/pagination";
import { AppError } from "../../../middleware/errorHandler";
import { UPLOAD_PORFILE_FAILED } from "../../../constants/messages";
import IMediaService from "../../mediaService/interface/IMediaService";
import HttpStatus from "../../../constants/httpStatusCode";


@injectable()
export default class UserService implements IUserService {
    constructor(@inject(TYPES.UserRepository) private _userRepository:IUserRepository,
                @inject(TYPES.MediaService) private _MediaService:IMediaService   ) {}
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
    updateUserProfile=async(userId: string, data: Partial<IUser>): Promise<IUser|null> =>{
        
        return await this._userRepository.updateUserProfile(userId,data)
    }
    getProfile=async(userId:string):Promise<IUser|null>=>{
        return await this._userRepository.getProfile(userId)
    }
    updateUserProfilePicture=async(userId: string, file: Express.Multer.File): Promise<IUser | null>=> {
        let imageUrl:string|undefined
        if(file){
            imageUrl=await this._MediaService.upload(file)
        }
        if(!imageUrl){
            throw new AppError(UPLOAD_PORFILE_FAILED,HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const updateUser=await this._userRepository.updateUserProfile(userId,{imageUrl})
        return updateUser
    }
}
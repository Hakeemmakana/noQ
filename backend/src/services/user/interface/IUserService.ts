import { NextFunction } from "express";
import { IUser } from "../../../types/user";
import { PaginatedResult } from "../../../types/pagination";

export default interface IUserService{
    getAllUsers(search:string,page:number):  Promise<PaginatedResult<IUser>>;
    statusChange(userId:string,status:'active'|'blocked'): Promise<IUser|null>;
    deleteUser(usrerId:string):Promise<IUser|null>;
}
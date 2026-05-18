import { Types } from "mongoose";

export interface IUser{
    _id?:Types.ObjectId
    name:string;
    isVerified:boolean;
    imageUrl?:string;
    age?:number;
    gender?:string;
    dob?:Date;
    password:string;
    phone:string;
    email:string;
    googleId:string;
    isAdmin:boolean;
    isDeleted:boolean

}
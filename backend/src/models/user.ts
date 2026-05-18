import mongoose,{Schema,HydratedDocument}from 'mongoose'
import { IUser } from '../types/user'


const userSchema=new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    isAdmin:{type:Boolean,default:false},
    gender:{type:String,enum:['male','female','other']},
    imageUrl:{type:String},
    googleId:{type:String},
    age:{type:Number},
    dob:{type:String},
    isVerified:{type:Boolean,default:true},
    isDeleted:{type:Boolean,default:false},
    phone:{type:String}


},{timestamps:true});

export const User = mongoose.model<IUser>("User",userSchema);
export type UserDocument=HydratedDocument<IUser>;  


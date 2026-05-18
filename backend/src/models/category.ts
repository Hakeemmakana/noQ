import mongoose, { Schema,HydratedDocument, Types } from "mongoose";

export interface ICategory{
    _id?:Types.ObjectId;
    name:string;
    description:string;
    isDeleted:boolean;
    isAvailable:boolean;
    hotelId:mongoose.Types.ObjectId;
}


const categorySchema=new Schema<ICategory>({
    name:{type:String,required:true},
    description:{type:String,required:true},
    isAvailable:{type:Boolean,default:true},
    isDeleted:{type:Boolean,default:false},
    hotelId:{type:Schema.Types.ObjectId,required:true}
})

const Category=mongoose.model<ICategory>('Category',categorySchema);
export default Category;
export type CategoryDocument=HydratedDocument<ICategory>;
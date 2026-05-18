import mongoose,{Schema,HydratedDocument, Types} from "mongoose";
export interface IStaff{
    _id?:Types.ObjectId
    name:string;
    email:string;
    isActive:boolean;
    password:string;
    role:'waiter'|'chef';
    hotelId:mongoose.Types.ObjectId;
    isDeleted:boolean;
};

const staffSchema=new Schema<IStaff>({
    name:{ type: String ,required:true},
    email: { type: String, required: true},
    isActive:{type:Boolean,default:true},
    password:{type:String,required:true},
    role:{type:String,enum:['waiter','chef']},
    hotelId:{type:Schema.Types.ObjectId},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true});

const Staff=mongoose.model<IStaff>('Staff',staffSchema);
export default Staff;
export type StaffDocument=HydratedDocument<IStaff>;

import mongoose,{HydratedDocument,Schema, Types,} from "mongoose";
import { IHotelAdmin } from "./hotelAdmin";

export interface ITable{
    _id?:Types.ObjectId;
    tableNumber:string;
    seatingCapacity:number;
    isDeleted:boolean;
    isAvailable:boolean;
    hotelId:mongoose.Types.ObjectId|IHotelAdmin;
}
const tableSchema=new Schema<ITable>({
    tableNumber:{type:String,requrired:true},
    seatingCapacity:{type:Number,required:true},
    isDeleted:{type:Boolean,default:false},
    isAvailable:{type:Boolean,default:true},
    hotelId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'HotelAdmin'
    }

})
const Table=mongoose.model<ITable>('Table',tableSchema);
export default Table;
export type TableDocument=HydratedDocument<ITable>;
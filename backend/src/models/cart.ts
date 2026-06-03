import mongoose, {HydratedDocument, Schema, Types} from "mongoose";
import { IMenuItem } from "./menuItem";
type cartItems={
    itemId:Types.ObjectId|IMenuItem;
    quantity:number
}
export interface ICart{
    _id?:Types.ObjectId;
    userId:Types.ObjectId;
    hotelId:Types.ObjectId;
    items:cartItems[];
}
const cartSchema =new Schema<ICart>({
    userId:{type:Schema.Types.ObjectId,required:true},
    hotelId:{type:Schema.Types.ObjectId,required:true},
    items:[{
        itemId:{type:Schema.Types.ObjectId,required:true,ref:'Menu'},
        quantity:{type:Number,required:true,min:1,default:1}
        
    }]
},{timestamps:true})

const Cart=mongoose.model<ICart>('Cart',cartSchema)
export default Cart
export type CartDocument=HydratedDocument<ICart>
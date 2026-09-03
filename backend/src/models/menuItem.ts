import mongoose, { Schema, HydratedDocument} from 'mongoose';
import MenuVariantSchema, { IMenuVariant } from './menuVarient';

export interface IMenuItem{
  _id?:mongoose.Types.ObjectId;
  itemName: string;
  itemImage: string;
  category: mongoose.Types.ObjectId;
  isAvailable: boolean;
  description: string;
  isDeleted: boolean;
  type: 'kitchen'|'quick';
  stock: number;
  stockMode:"SHARED"| "PER_VARIANT";
  variants:IMenuVariant[];
  status: string;
  hotelId: mongoose.Types.ObjectId;
}


const MenuItemSchema = new Schema<IMenuItem>({
  itemName: { type: String,required:true },
  itemImage: { type: String,required:true },
  category: { type: Schema.Types.ObjectId,required:true,ref:'Category'},
  isAvailable: { type: Boolean,default:true },
  description: { type: String,required:true },
  isDeleted: { type: Boolean ,default:false},
  type: { type: String, enum: [ 'kitchen', 'quick' ] },
  stock: { type: Number },
  stockMode: {type: String,enum: ["SHARED", "PER_VARIANT"],required:true},
  variants:{type:[MenuVariantSchema],default:[]},
  status: { type: String, enum: [ 'out_of_stock', 'available' ] },
  hotelId: { type: Schema.Types.ObjectId,required:true },
});

const MenuItem = mongoose.model<IMenuItem>('Menu', MenuItemSchema);

export default MenuItem;
export type MenuItemDocument=HydratedDocument<IMenuItem>;


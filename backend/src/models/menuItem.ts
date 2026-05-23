import mongoose, { Schema, HydratedDocument, ObjectId } from 'mongoose';

export interface IMenuItem{
  _id?:mongoose.Types.ObjectId;
  itemName: string;
  itemImage: string;
  category: mongoose.Types.ObjectId;
  isAvailable: boolean;
  description: string;
  price: number;
  isDeleted: boolean;
  type: 'kitchen'|'quick'
  stock: number;
  status: string;
  hotelId: mongoose.Types.ObjectId;
}

const MenuItemSchema = new Schema<IMenuItem>({
  itemName: { type: String,required:true },
  itemImage: { type: String,required:true },
  category: { type: Schema.Types.ObjectId,required:true },
  isAvailable: { type: Boolean,default:true },
  description: { type: String,required:true },
  price: { type: Number,required:true },
  isDeleted: { type: Boolean ,default:false},
  type: { type: String, enum: [ 'kitchen', 'quick' ] },
  stock: { type: Number },
  status: { type: String, enum: [ 'out_of_stock', 'available' ] },
  hotelId: { type: Schema.Types.ObjectId,required:true },
});

const MenuItem = mongoose.model<IMenuItem>('Menu', MenuItemSchema);

export default MenuItem;
export type MenuItemDocument=HydratedDocument<IMenuItem>;


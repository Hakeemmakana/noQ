import mongoose, { Schema, HydratedDocument, ObjectId } from 'mongoose';

export interface IProduct{
  _id: ObjectId;
  productName: string;
  productImage: string;
  category: ObjectId;
  isAvailable: boolean;
  description: string;
  price: number;
  isDeleted: boolean;
  type: 'kitchen'|'stock'
  stock: string;
  status: string;
  hotelId: ObjectId;
}

const ProductSchema = new Schema<IProduct>({
  productName: { type: String,required:true },
  productImage: { type: String,required:true },
  category: { type: Schema.Types.ObjectId,required:true },
  isAvailable: { type: Boolean,default:true },
  description: { type: String,required:true },
  price: { type: Number,required:true },
  isDeleted: { type: Boolean ,default:false},
  type: { type: String, enum: [ 'kitchen', 'stock' ] },
  stock: { type: String,required:true },
  status: { type: String, enum: [ 'out_of_stock', 'available' ] },
  hotelId: { type: Schema.Types.ObjectId,required:true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
export type ProductDocument=HydratedDocument<IProduct>;


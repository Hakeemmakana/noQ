  import mongoose, { Schema, HydratedDocument,Types } from 'mongoose';

  export interface IHotelAdmin {
    _id?:Types.ObjectId
    restaurantName: string;
    email: string;
    fullAddress: string;
    phone: string;
    location: string;
    restaurantCertificate: string;
    status: 'pending' | 'approved' | 'rejected';
    imageUrl?: string;
    slug:string;
    password: string;
  }
  const HotelAdminSchema: Schema = new Schema<IHotelAdmin>({
    restaurantName: { type: String ,required:true},
    email: { type: String, required: true,},
    fullAddress: { type: String },
    phone: { type: String },
    location: { type: String },
    restaurantCertificate: { type: String },
    status: { type: String, enum: [ 'pending', 'approved', 'rejected' ] },
    imageUrl: { type: String },
    slug: { type: String },
    password: { type: String ,required:true},
  });


  const HotelAdmin = mongoose.model<IHotelAdmin>('HotelAdmin', HotelAdminSchema);

  export default HotelAdmin;
  export type HotelAdminDocument = HydratedDocument<IHotelAdmin>;


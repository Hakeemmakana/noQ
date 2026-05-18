// src/types/profileTypes.ts
export type AdminProfile = {
  _id?: string;
  imageUrl: string|null ;
  restaurantName: string;
  email: string;
  phone: string;
  location: string ;
  fullAddress: string ;
};

export type ProfileFormData = {
  restaurantName: string;
  email: string;
  phone: string;
  location:string;
  fullAddress:string;
};

export type PasswordFormData = {
  otp: string;
  password: string;
  confirmPassword: string;
};

export type FieldErrors = {
  restaurantName?: string;
  phone?: string;
  dob?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
  location?:string;
  fullAddress?:string;
};
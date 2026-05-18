// src/types/profileTypes.ts
export type UserProfile = {
  _id: string;
  imageUrl: string|null ;
  name: string;
  email: string;
  phone: string;
  dob: string |null;
};

export type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  dob: string;
};

export type PasswordFormData = {
  otp: string;
  password: string;
  confirmPassword: string;
};

export type FieldErrors = {
  name?: string;
  phone?: string;
  dob?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
};
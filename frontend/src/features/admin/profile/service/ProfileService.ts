
import getErrorMessage from "../../../../utils/getErrorMessage";
import adminApi from "../../../../services/adminApi";
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";
interface IUpdateProfile{
    restaurantName:string;
    phone:string;
    location:string;
    fullAddress:string;
}
interface IResetPassword{
    token: string;
    newPassword:string;
}
// src/api/profileApi.ts

export async function fetchProfile(){
try {
    const response=await adminApi.get(`/${ADMIN_ROUTE}/profile`)
    return response.data.data
} catch (error) {
   throw(getErrorMessage(error))
}
}
export async function uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    try {
        const response = await adminApi.patch(`/${ADMIN_ROUTE}/profile/profilePhotoChange`, formData)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}

export async function updateProfile(data: IUpdateProfile) {
   try {
    const response = await adminApi.patch(`/${ADMIN_ROUTE}/profile`, data)
        return response.data
   } catch (error) {
    throw(getErrorMessage(error))
   }
}

export async function requestPasswordOtp(email:string) {
    try {
        const response = await adminApi.post(`/${ADMIN_ROUTE}/profile/requestOtp`,{email})
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
export async function requestResentOtp(email:string) {
    try {
        const response = await adminApi.post(`/${ADMIN_ROUTE}/profile/resentOtp`,{email,pupose:`other`})
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}

export async function verifyPasswordOtp(email:string,otp: string) {
    try {
        const response = await adminApi.post(`/${ADMIN_ROUTE}/profile/verifyOtp`, {email,otp,purpose:`reset-password`})
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
export async function resetPassword(data:IResetPassword ) {
    try {
        const response = await adminApi.post(`/${ADMIN_ROUTE}/profile/resetPassword`, data)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}


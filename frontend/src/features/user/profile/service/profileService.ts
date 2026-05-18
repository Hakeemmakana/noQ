import userApi from "../../../../services/userApi";
import getErrorMessage from "../../../../utils/getErrorMessage";
interface IUpdateProfile{
    name:string;
    phone:string;
    dob?:string|null
}
interface IResetPassword{
    token: string;
    newPassword:string;
}
// src/api/profileApi.ts

export async function fetchProfile(){
try {
    const response=await userApi.get('/profile')
    return response.data.data
} catch (error) {
   throw(getErrorMessage(error))
}
}
export async function uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    try {
        const response = await userApi.patch('/profile/profilePhotoChange', formData)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}

export async function updateProfile(data: IUpdateProfile) {
   try {
    const response = await userApi.patch('/profile', data)
        return response.data
   } catch (error) {
    throw(getErrorMessage(error))
   }
}

export async function requestPasswordOtp(email:string) {
    try {
        const response = await userApi.post('/profile/requestOtp',{email})
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
export async function requestResentOtp(email:string) {
    try {
        const response = await userApi.post('/profile/resentOtp',{email,pupose:'other'})
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}

export async function verifyPasswordOtp(email:string,otp: string) {
    try {
        const response = await userApi.post('/profile/verifyOtp', {email,otp,purpose:'reset-password'})
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
export async function resetPassword(data:IResetPassword ) {
    try {
        const response = await userApi.post('/profile/resetPassword', data)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}


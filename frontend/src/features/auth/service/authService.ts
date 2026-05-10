import userApi from '../../../services/userApi'
import { AUTH_ROUTE } from "../../../shared/constants/apiRoutes";
import type { User } from '../../../shared/types/userTypes';

interface AuthResponse {
    user: User;
    accessToken: string;
    message: string
}
// type ApiError = {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
// };
const getErrorMessage = (error: any): string => {
    return error?.response?.data?.message || "Something went wrong";
};

export const loginApi = async (data: { email: string, password: string,context:string }): Promise<AuthResponse> => {
    try {
        const response = await userApi.post<AuthResponse>(`/${AUTH_ROUTE}/login`, data);
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const registerUserApi = async (data: { name: string, email: string, phone: string, password: string }): Promise<any> => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/register`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const verifyOtp = async (data: { otp: string, purpose: string }) => {
    try {
        // console.log(data)
        const response = await userApi.post(`/${AUTH_ROUTE}/verifyOtp`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}
export const resendOtp=async(data:{email:string,purpose:string})=>{
    try {
    const response=await userApi.post(`/${AUTH_ROUTE}/resendOtp`,data)
    return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const forgetPassword=async(data:{email:string})=>{
    try {
        const response=await userApi.post(`/${AUTH_ROUTE}/forgetPassword`,data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const resetPassword=async(data:{token:string,newPassword:string})=>{
    try {
        const response =await userApi.post(`/${AUTH_ROUTE}/resetPassword`,data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
        
    }
}
export const googleLogin=async(data:{token:string})=>{
    try {
        const response=await userApi.post(`/${AUTH_ROUTE}/googleAuth`,data)
        return response.data
    } catch (error) {
        console.log(error)
        throw (getErrorMessage(error))
    }
}
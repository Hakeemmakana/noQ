import userApi from '../../../services/userApi'
import { AUTH_ROUTE } from "../../../shared/constants/apiRoutes";
import type { User } from '../../../shared/types/userTypes';
import getErrorMessage from '../../../utils/getErrorMessage';

interface AuthResponse {
    user: User;
    accessToken: string;
    message: string
}




export const loginApi = async (data: { email: string, password: string }): Promise<AuthResponse> => {
    try {
        const response = await userApi.post<AuthResponse>(`/${AUTH_ROUTE}/login`, data);
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const registerUserApi = async (data: { name: string, email: string, phone: string, password: string }): Promise<{message:string}> => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/register`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const verifyOtp = async (data: { otp: string, purpose: string }) => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/verifyOtp`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}
export const resendOtp = async (data: { email: string, purpose: string }) => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/resendOtp`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const forgetPassword = async (data: { email: string }) => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/forgetPassword`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const resetPassword = async (data: { token: string, newPassword: string }) => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/resetPassword`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))

    }
}
export const googleLogin = async (data: { token: string }) => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/googleAuth`, data)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const adminLoginApi = async (data: { email: string, password: string }): Promise<AuthResponse> => {
    try {
        const response = await userApi.post<AuthResponse>(`/${AUTH_ROUTE}/adminLogin`, data);
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

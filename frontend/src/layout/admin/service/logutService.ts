import userApi from '../../../services/api'
import { AUTH_ROUTE } from "../../../shared/constants/apiRoutes";

const getErrorMessage = (error: any): string => {
    return error?.response?.data?.message || "Something went wrong";
};

export const logoutAdmin=async()=>{
    try {
        const response=await userApi.post(`/${AUTH_ROUTE}/adminLogout`)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
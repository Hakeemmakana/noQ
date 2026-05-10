import api from '../../../services/api'
import { AUTH_ROUTE } from "../../../shared/constants/apiRoutes";

const getErrorMessage = (error: any): string => {
    return error?.response?.data?.message || "Something went wrong";
};

export const logoutUser=async()=>{
    try {
        const response=await api.post(`/${AUTH_ROUTE}/userLogout`)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
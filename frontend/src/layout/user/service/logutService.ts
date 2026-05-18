
import userApi from '../../../services/userApi';
import { AUTH_ROUTE } from "../../../shared/constants/apiRoutes";
import type { ApiError } from '../../../utils/typs';

const getErrorMessage = (error: unknown): string => {
    if(typeof error==='object'&&error!==null&&'response' in error){

        return (error as ApiError)?.response?.data?.message || "Something went wrong";
    }
    return 'something went wrong'
};

export const logoutUser=async()=>{
    try {
        const response=await userApi.post(`/${AUTH_ROUTE}/userLogout`)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
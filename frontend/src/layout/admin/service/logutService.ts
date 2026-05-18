import userApi from '../../../services/userApi'
import { AUTH_ROUTE } from "../../../shared/constants/apiRoutes";
import getErrorMessage from '../../../utils/getErrorMessage';



export const logoutAdmin=async()=>{
    try {
        const response=await userApi.post(`/${AUTH_ROUTE}/adminLogout`)
        return response.data
    } catch (error) {
        throw(getErrorMessage(error))
    }
}
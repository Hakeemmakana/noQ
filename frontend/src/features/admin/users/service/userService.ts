import adminApi from "../../../../services/adminApi"
import { ADMIN_ROUTE } from "../../../../shared/constants/apiRoutes";

const getErrorMessage = (error: any): string => {
    return error?.response?.data?.message || "Something went wrong";
};
export const getUsers = async (search: string,page:number) => {
    try {
        const res = await adminApi.get(`/${ADMIN_ROUTE}/users`,{
            params:{
                search,
                page
            }
        })
        return res.data

    } catch (error) {
        console.dir(error,{depth:null})
        throw(getErrorMessage(error))
    }
}
export const statusChange = async (id:string,status:'active'|'blocked') => {
    try {
        const res = await adminApi.patch(`/${ADMIN_ROUTE}/users/${id}/status`,{
            status
        })
        return res.data

    } catch (error) {
        throw(getErrorMessage(error))
    }
}
export const deleteUser = async (id:string) => {
    try {
        const res = await adminApi.patch(`/${ADMIN_ROUTE}/users/${id}/soft-delete`)
        return res.data

    } catch (error) {
        throw(getErrorMessage(error))
    }
}
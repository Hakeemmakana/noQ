
import staffApi from '../../../services/staffApi';
import userApi from '../../../services/userApi';
import { AUTH_ROUTE, CHEF_ROUTE, WAITER_ROUTE } from "../../../shared/constants/apiRoutes";
import type { ApiError } from '../../../utils/typs';


const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null && 'response' in error) {

        return (error as ApiError)?.response?.data?.message || "Something went wrong";
    }
    return 'something went wrong'
};

export const logoutStaff = async () => {
    try {
        const response = await userApi.post(`/${AUTH_ROUTE}/staffLogout`)
        return response.data
    } catch (error) {
        throw (getErrorMessage(error))
    }
}

export const getNotificaton = async (staffType:string) => {
    const ROUTE=staffType=='chef'?CHEF_ROUTE:WAITER_ROUTE;
    try {
        const res = await staffApi.get(`/${ROUTE}/notification`);
        return res.data.data
    } catch (error) {
        throw getErrorMessage(error);
    }
}
export const markAsRead = async (staffType:string,notificationId:string) => {
    const ROUTE=staffType=='chef'?CHEF_ROUTE:WAITER_ROUTE;
    try {
        const res = await staffApi.patch(`/${ROUTE}/notification/${notificationId}`);
        return res.data.data
    } catch (error) {
        throw getErrorMessage(error);
    }
}
export const markAllAsRead = async (staffType:string) => {
    const ROUTE=staffType=='chef'?CHEF_ROUTE:WAITER_ROUTE;
    try {
        const res = await staffApi.patch(`/${ROUTE}/allNotification`);
        return res.data.data
    } catch (error) {
        throw getErrorMessage(error);
    }
}
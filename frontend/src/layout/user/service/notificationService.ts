
import userApi from '../../../services/userApi';
import type { ApiError } from '../../../utils/typs';

const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null && 'response' in error) {

        return (error as ApiError)?.response?.data?.message || "Something went wrong";
    }
    return 'something went wrong'
};



export const getNotificaton = async () => {
    try {
        const res = await userApi.get(`/notification`);
        return res.data.data
    } catch (error) {
        
        throw getErrorMessage(error);
    }
}
export const markAsRead = async (notificationId:string) => {
    try {
        const res = await userApi.patch(`/notification/${notificationId}`);
        return res.data.data
    } catch (error) {
        throw getErrorMessage(error);
    }
}
export const markAllAsRead = async () => {
    try {
        const res = await userApi.patch(`/allNotification`);
        return res.data.data
    } catch (error) {
        throw getErrorMessage(error);
    }
}
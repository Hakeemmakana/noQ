import type { ApiError } from "./typs";

const  getErrorMessage = (error:unknown): string => {
    if (typeof error == 'object' && error !== null && 'response' in error) {
        return (error as ApiError)?.response?.data?.message || "Something went wrong";
    }
    return 'somehting went wrong'
};
export default getErrorMessage
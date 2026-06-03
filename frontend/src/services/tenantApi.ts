import axios from "axios";
import { store } from "../app/store";
import { setUserAccessToken, userLogout } from "../features/auth/authSlice/userAuthSlice";
import { axiosConfig, API_URL } from "./apiConfig";
import { errorToast } from "../shared/utils/toastNotification";


const getSlugFromUrl = (): string => {
    return 'thaza'
    // if (typeof window !== "undefined") {
    //     const pathParts = window.location.pathname.split("/");
    //     return pathParts[1] || ""; 
    // }
    // return "";
};
const tenantApi = axios.create(axiosConfig);

// Request Interceptor: Attach User Token
tenantApi.interceptors.request.use((config) => {
    const token = store.getState().userAuth.token;
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const slug = getSlugFromUrl();
    if(slug&&config.url){
        config.url=`/${slug}${config.url}`
    }
    console.log('lastRrl',config.url)
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Refresh & Block logic
tenantApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        
        const originalRequest = error.config;

        // Handle Blocked User
        if (error.response?.status === 403 && error.response?.data?.message === 'This account is blocked by Admin.') {
            setTimeout(() => {
                store.dispatch(userLogout());
            }, 2000);
            return Promise.reject(error);
        }

        // Handle Token Refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
                store.dispatch(setUserAccessToken(data.accessToken));
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return tenantApi(originalRequest);
            } catch (refreshError) {
                store.dispatch(userLogout());
                return Promise.reject(refreshError);
            }
        }
        let errorData
        if(error?.response?.data?.errors){
            errorData=Object.values(error?.response?.data?.errors)

        }
        
        if(errorData&&errorData.length){
            errorData.forEach((item:unknown) => {
                if(typeof item=='string'){
                    errorToast(item)
                }
            });
        }
        return Promise.reject(error);
    }
);

export default tenantApi;
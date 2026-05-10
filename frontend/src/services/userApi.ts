import axios from "axios";
import { store } from "../app/store";
import { setUserAccessToken, userLogout } from "../features/auth/authSlice/userAuthSlice";
import { axiosConfig, API_URL } from "./apiConfig";

const userApi = axios.create(axiosConfig);

// Request Interceptor: Attach User Token
userApi.interceptors.request.use((config) => {
    const token = store.getState().userAuth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Refresh & Block logic
userApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error,'error occurend')
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
                return userApi(originalRequest);
            } catch (refreshError) {
                store.dispatch(userLogout());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default userApi;
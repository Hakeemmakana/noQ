import axios from "axios";
import { store } from "../app/store";
import { adminLogout, setAdminAccessToken } from "../features/auth/authSlice/adminAuthSlice";
import { axiosConfig, API_URL } from "./apiConfig";


const adminApi = axios.create(axiosConfig);

// Request Interceptor: Attach Admin Token
adminApi.interceptors.request.use((config) => {

    const token = store.getState().adminAuth.token; // Ensure this matches your admin slice state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Refresh Admin Token
adminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Adjust this URL to your specific Admin refresh endpoint if different
                const { data } = await axios.post(`${API_URL}/auth/admin-refresh-token`, {}, { withCredentials: true });
                store.dispatch(setAdminAccessToken(data.accessToken));
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return adminApi(originalRequest);
            } catch (refreshError) {
               store.dispatch(adminLogout())
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default adminApi;
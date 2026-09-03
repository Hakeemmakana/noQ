import axios from "axios";
import { store } from "../app/store";
import { staffLogout,setstaffAccessToken} from "../features/auth/authSlice/staffAuthSlice";
import { axiosConfig, API_URL } from "./apiConfig";


const staffApi = axios.create(axiosConfig);

// Request Interceptor: Attach Admin Token
staffApi.interceptors.request.use((config) => {

    const token = store.getState().staffAuth.token; // Ensure this matches your admin slice state
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, (error) => Promise.reject(error));

// Response Interceptor: Refresh Admin Token
staffApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Adjust this URL to your specific Admin refresh endpoint if different
                const { data } = await axios.post(`${API_URL}/auth/staff-refresh-token`, {}, { withCredentials: true });
                store.dispatch(setstaffAccessToken(data.accessToken));
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return staffApi(originalRequest);
            } catch (refreshError) {
               store.dispatch(staffLogout())
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default staffApi;
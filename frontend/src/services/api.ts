import axios from "axios";
import { store } from "../app/store";
import { setUserAccessToken,userLogout} from "../features/auth/authSlice/userAuthSlice";
import { setAdminAccessToken } from "../features/auth/authSlice/adminAuthSlice";



const isLocal=window.location.hostname==='localhost';
const API_URL=isLocal==true
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_P_API_BASE_URL; 


const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
});

api.interceptors.request.use((config)=>{
    const token=store.getState().userAuth.token
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},(error)=>Promise.reject(error)
)
 api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config;

        if(error.response?.status===403&&
            error.response?.data?.message=='This account is blocked by Admin.'){
            setTimeout(async()=>{
                // await logoutApi()
                store.dispatch(userLogout())
            },2000);
            return Promise.reject(error)
        }
        if(error.response?.status===401&&!originalRequest._retry){
                originalRequest._retry=true;   
            try {
                const {data}=await axios.post(`${API_URL}/auth/refresh-token`)
                store.dispatch(setAdminAccessToken(data.accessToken))
                originalRequest.headers.authorization=`Bearer${data.accessToken}`;
                return api(originalRequest)
            } catch (refreshError) {
                store.dispatch(userLogout())
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error);
    }
 );
 export default api
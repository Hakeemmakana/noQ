import axios from "axios";

const isLocal=window.location.hostname==='localhost';
export const API_URL=isLocal==true
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_P_API_BASE_URL; 


export const axiosConfig={
    baseURL:API_URL,
    withCredentials:true
}
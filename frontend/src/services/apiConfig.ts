// const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// export const API_URL = isMobile
//   ? "http://192.168.1.52:4001"
//   : "http://localhost:4001";

const isLocal=window.location.hostname==='localhost';
export const API_URL=isLocal==true
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_P_API_BASE_URL; 


export const axiosConfig={
    baseURL:API_URL,
    withCredentials:true
}
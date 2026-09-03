import { io } from "socket.io-client";
const URL=import.meta.env.VITE_API_BASE_URL
export const getSocket=()=>{
 const socket = io(URL, {
  withCredentials: true,
  autoConnect: true,
});
return socket
}

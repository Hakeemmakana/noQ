import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {User} from '../../../shared/types/userTypes'


interface AuthState{
    user:User|null;
    token:string|null;
    isAuthenticated: boolean;
}
interface loginPayload{
    user:User;
    token:string|null;
}
const initialState:AuthState={
    user:null,
    token:null,
    isAuthenticated:false
}

const userAuthSlice=createSlice({
    name:'userAuth',
    initialState,
    reducers:{
        userLogin:(state,action:PayloadAction<loginPayload>)=>{
            const {user,token}=action.payload
            state.user={
                _id:user._id,
                name:user.name,
                phone:user.phone,
                email:user.email,
                isAdmin:user.isAdmin,
                imageUrl:user.imageUrl
            };
            state.token=token;
            state.isAuthenticated=true;
        },
        userLogout:(state)=>{
            state.user=null;
            state.token=null
            state.isAuthenticated=false
        },
        setUserAccessToken:(state,actoin)=>{
            state.token=actoin.payload
        }
    }
})
export const{userLogin,userLogout,setUserAccessToken}=userAuthSlice.actions
export default userAuthSlice.reducer
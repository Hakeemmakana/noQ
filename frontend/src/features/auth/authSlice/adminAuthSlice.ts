import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from '../../../shared/types/userTypes'



interface adminAuthState {
    admin: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
interface loginPayload {
    user: User;
    token: string | null;
}
const initialState: adminAuthState = {
    admin: null,
    token: null,
    isAuthenticated: false
}

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        adminLogin: (state, action: PayloadAction<loginPayload>) => {
            const { user, token } = action.payload
            state.admin = {
                _id: user._id,
                name: user.restaurantName!,
                phone: user.phone,
                email: user.email,
                isAdmin: user.isAdmin,
                imageUrl: user.imageUrl
            };
            state.token = token;
            state.isAuthenticated = true;
        },
        adminLogout: (state) => {
            state.admin = null;
            state.token = null
            state.isAuthenticated = false
        },
        setAdminAccessToken: (state, actoin) => {
            state.token = actoin.payload
        },
        setAdminName:(state,action)=>{
            if(state.admin){
                state.admin.name=action.payload
            }
        },
        setAdminImage: (state, action) => {
            if (state.admin) {
                state.admin.imageUrl = action.payload
            }
        }
    }
})
export const { adminLogin, adminLogout, setAdminAccessToken,setAdminImage,setAdminName } = adminAuthSlice.actions
export default adminAuthSlice.reducer
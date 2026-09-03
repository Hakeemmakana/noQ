import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IStaff {
    name: string;
    email: string;
    role: 'waiter' | 'chef';
    hotelId:string;
}
interface staffAuthState {
    staff: IStaff | null;
    token: string | null;
    role: string | null;
}
interface loginPayload {
    staff: IStaff;
    token: string | null;
}
const initialState: staffAuthState = {
    staff: null,
    token: null,
    role: null
}

const staffAuthSlice = createSlice({
    name: 'staffAuth',
    initialState,
    reducers: {
        staffLogin: (state, action: PayloadAction<loginPayload>) => {
            const { staff, token } = action.payload
            state.staff = {
                name: staff.name!,
                email: staff.email,
                role:staff.role,
                hotelId:staff.hotelId
            };
            state.token = token;
            state.role =staff.role;
        },
        staffLogout: (state) => {
            state.staff = null;
            state.token = null
            state.role =null
        },
        setstaffAccessToken: (state, actoin) => {
            state.token = actoin.payload
        },
    }
})

export const{staffLogin,staffLogout,setstaffAccessToken}=staffAuthSlice.actions
export default staffAuthSlice.reducer
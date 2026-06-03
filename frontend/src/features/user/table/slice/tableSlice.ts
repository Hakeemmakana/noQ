import { createSlice,type PayloadAction} from "@reduxjs/toolkit";
interface tableState{
    tableId:string|null;
    tableNo:string|null;
}
const initialState:tableState={
    tableId:null,
    tableNo:null
}
const tableSlice=createSlice({
    name:'table',
    initialState,
    reducers:{
        saveTable:(state,action:PayloadAction<tableState>)=>{
            const {tableId,tableNo}=action.payload
            state.tableId=tableId
            state.tableNo=tableNo
        }
    }
})
export const {saveTable}=tableSlice.actions
export default tableSlice.reducer
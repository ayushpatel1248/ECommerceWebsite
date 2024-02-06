import { createSlice } from "@reduxjs/toolkit";

const userLoginDataSlice = createSlice({
    name:"userLoginDataSlice",
    initialState : {},
    reducers:{
        addData(state , action){
            state = action.payload;
            console.log(state)
        }
    }
})
export const{addData} = userLoginDataSlice.actions
export default userLoginDataSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const showEmailUpdateProfileSlice = createSlice({
    name:"showEmailUpdateProfileSlice",
    initialState:{value:false},
    reducers:{
        showEmailSection (state,action){
            console.log(action.payload)
            state.value = action.payload
        }
    }
})


export const{showEmailSection } = showEmailUpdateProfileSlice.actions;
export default showEmailUpdateProfileSlice.reducer;
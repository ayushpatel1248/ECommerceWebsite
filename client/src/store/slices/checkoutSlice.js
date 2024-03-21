import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const checkoutSlice = createSlice({
    name: "checkoutSlice",
    initialState: {checkoutProductArray:[]},
    reducers:{

        setCheckOutData(state, action){

            // console.log("checkout data =>",action.payload)
            state.checkoutProductArray = action.payload
            console.log(state.checkoutProductArray)
        }

    }

})

export const { setCheckOutData } = checkoutSlice.actions
export default checkoutSlice.reducer;
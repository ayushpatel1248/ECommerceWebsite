import { createSlice } from "@reduxjs/toolkit";

const profileUpdattionSlice = createSlice({
    name: "profileUpdattionSlice",
    initialState: {
        name: false,
        mobile: false,
        address: false
    },
    reducers: {
        setNameValue(state, action) {
            state.name = action.payload
        },
        setMobileValue(state, action) {
            state.mobile = action.payload
        },
        setAddressValue(state, action) {
            state.address = action.payload
        }
    }
})

export const { setNameValue, setMobileValue ,setAddressValue } = profileUpdattionSlice.actions;
export default profileUpdattionSlice.reducer;
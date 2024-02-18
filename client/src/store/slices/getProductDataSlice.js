import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getProductDataSlice = createSlice({
    name: "getProductDataSlice",
    initialState: { productData: null },
    reducers: {
        getProductData(state, action) {
            state.productData = action.payload;
            console.log("getProductDataSlice", state["productData"])
        },
    }
});
export const fetchProductData = (skip, limit) => async (dispatch) => {
    try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${BASE_URL}/products`, { params: { "skip": skip, "limit": limit } });
        const data = response.data.data;
        dispatch(getProductData(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const { getProductData } = getProductDataSlice.actions
export default getProductDataSlice.reducer;

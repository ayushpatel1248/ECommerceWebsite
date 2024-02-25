import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getProductDataSlice = createSlice({
    name: "getProductDataSlice",
    initialState: { productData: [] , count:0},
    reducers: {
        getProductData(state, action) {
            state.productData = action.payload.productData;
            state.count = action.payload.count;
            console.log("getProductDataSlice = ", action.payload)
        },
    }
});
export const fetchProductData = (skip, limit) => async (dispatch) => {
    try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${BASE_URL}/products`, { params: { "skip": skip, "limit": limit } });
        const data = response.data.data;
        console.log("this is dat a= ", data)
        dispatch(getProductData(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const fetchFilteredProductData = (lowPrize, highPrize) => async (dispatch) => {
    try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${BASE_URL}/filter`, { params: { "lowPrize": lowPrize, "highPrize": highPrize } });
        const data = {productData : response.data.data, count:{count:1}};
        // console.log("ayush bhai =",getProductData(data))
        dispatch(getProductData(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const { getProductData } = getProductDataSlice.actions
export default getProductDataSlice.reducer;

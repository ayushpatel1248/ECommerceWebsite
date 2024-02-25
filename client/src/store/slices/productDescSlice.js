import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productDescSlice = createSlice({
    name :"productDescSlice",
    initialState : {productDetail:null},  
    reducers:{  

        storeProductData (state , action){
            state.productDetail = action.payload
        }
      
    }
})

export const fetchProductDetail = (_id) => async (dispatch) => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${BASE_URL}/Product-Description?product_id=${_id}`);
      const data = response.data.data;
      dispatch(storeProductData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

export const{storeProductData } = productDescSlice.actions
export default productDescSlice.reducer;
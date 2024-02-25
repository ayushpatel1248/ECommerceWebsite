import { createSlice } from "@reduxjs/toolkit";


const productDescSlice = createSlice({
    name :"productDescSlice",
    initialState : {productDetail:null},  
    reducers:{  

        storeProductData (state , action){
            state.productDetail = action.payload
        }
      
    }
})

export const{storeProductData } = productDescSlice.actions
export default productDescSlice.reducer;
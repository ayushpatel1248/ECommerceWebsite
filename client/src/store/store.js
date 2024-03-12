import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/exampleSlice";
import userLoginDataSlice from "./slices/userLoginDataSlice";
import getProductDataSlice from "./slices/getProductDataSlice";
import showEmailUpdateProfileSlice from "./slices/showEmailUpdateProfileSlice";
import profileUpdattionSlice from "./slices/profileUpdattionSlice";
import productDescSilce from "./slices/productDescSlice"
import searchDataSlice from "./slices/searchDataSlice"

const store = configureStore({
    reducer: {
        example: exampleSlice,
        userLoginData: userLoginDataSlice,

        getProductData: getProductDataSlice,
        showEmailUpdateProfile: showEmailUpdateProfileSlice,
        profileUpdattion: profileUpdattionSlice,
        getProductData: getProductDataSlice,
        productDesc: productDescSilce,
        searchData: searchDataSlice,

        // cartData : cartDataSlice
        //and more reducer are add here...
    }
})

export default store
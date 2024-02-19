import { configureStore } from "@reduxjs/toolkit";
import exampleSlice  from "./slices/exampleSlice";
import userLoginDataSlice from "./slices/userLoginDataSlice";
import getProductDataSlice from "./slices/getProductDataSlice";
import showEmailUpdateProfileSlice from "./slices/showEmailUpdateProfileSlice";
import profileUpdattionSlice from "./slices/profileUpdattionSlice";
const store = configureStore({
    reducer :{
        example : exampleSlice,
        userLoginData : userLoginDataSlice,
 
        getProductData : getProductDataSlice,
        showEmailUpdateProfile :  showEmailUpdateProfileSlice,
        profileUpdattion : profileUpdattionSlice,
        getProductData : getProductDataSlice 

        // cartData : cartDataSlice
        //and more reducer are add here...
    }
})
 
export default store

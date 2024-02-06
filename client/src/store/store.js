import { configureStore } from "@reduxjs/toolkit";
import exampleSlice  from "./slices/exampleSlice";
import userLoginDataSlice from "./slices/userLoginDataSlice";
const store = configureStore({
    reducer :{
        example : exampleSlice,
        userLoginData : userLoginDataSlice
        //and more reducer are add here...
    }
})
 
export default store

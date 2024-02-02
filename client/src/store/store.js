import { configureStore } from "@reduxjs/toolkit";
import exampleSlice  from "./slices/exampleSlice";
const store = configureStore({
    reducer :{
        example : exampleSlice
        //and more reducer are add here...
    }
})
 
export default store

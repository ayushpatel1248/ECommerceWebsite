import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userLoginDataSlice = createSlice({
    name:"userLoginDataSlice",
    initialState :[{userData:null}],
    reducers:{
        addData(state , action){
            //  state.push(action.payload);
             state[0]["userData"] = action.payload
            console.log("userLoginDataSlice", state[0]["userData"])
        },
        viewData(state , action){
            const BASE_URL = process.env.REACT_APP_BASE_URL
            axios.post(`${BASE_URL}/todo`,null,{headers:action.payload}).then((res)=>{
                if(res.data.status =="ok" ||res.data.status =="OK"){
                    console.log("res.data.data = ",res.data.data)
                    state[0]["userData"] = res.data.data;
                }else{
                    console.log("err comes from backend side in redux in useLoginDataSice ")
                }

            }).catch((err)=>{
                console.log("err in axios in useLoginDataSice redux",err )
            })
        
        }
    }
})
export const{addData , viewData} = userLoginDataSlice.actions
export default userLoginDataSlice.reducer;
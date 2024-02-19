import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userLoginDataSlice = createSlice({
    name:"userLoginDataSlice",
    initialState :{userData:null},
    reducers:{
        addData(state , action){
            state.userData = action.payload;
            console.log("userLoginDataSlice", state["userData"])
        },
    }
});

export const fetchData = (authorization) => async (dispatch) => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(`${BASE_URL}/user/getUserData`, null, { headers: { "authorization": authorization }});
      const data = response.data.data;
      dispatch(addData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
export const{addData , viewData} = userLoginDataSlice.actions
export default userLoginDataSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name :"exampleSlice",
    initialState : [],  //it can be object array , any numberr , string etc... that you want 
    reducers:{  //notic that it is reducers not reducer.

        //it takes many sub reducer.....like->
        exampleAdd(state , action){  // you can get initalState in state  and in action you get payload
            state.push(action.payload)  // this is just an exapmle
        },
        exampleRemove(state , action){  // you can get initalState in state  and in action you get payload
            state.delete(action.payload)
        },
    }
})

export const{exampleAdd ,exampleRemove} = exampleSlice.actions
export default exampleSlice.reducer;
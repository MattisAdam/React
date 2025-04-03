import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NumState{
    num : number;
}
const initialState : NumState ={
    num : 0,
}

const numReducer = createSlice({
    name: "number",
    initialState,
    reducers: {
        setNumber:(state, action: PayloadAction<number>) =>{
            state.num = action.payload;
        }
    }
})

export const {setNumber} = numReducer.actions;
export default numReducer.reducer;

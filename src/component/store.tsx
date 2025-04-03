import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import numReducer from "./counterSlice"


export const store = configureStore({
    reducer: {
        player: playerReducer, 
        number: numReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
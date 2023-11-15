import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter-slice"
export const store = configureStore({
    reducer: {
        filterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter-slice"
import currentRestaurantReducer from "./slices/currentRestaurant-slice"
import restaurantHistoryReducer from "./slices/restaurantHistory-slice";
export const store = configureStore({
    reducer: {
        filterReducer,
        currentRestaurantReducer,
        restaurantHistoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
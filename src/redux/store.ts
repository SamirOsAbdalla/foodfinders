import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filter-slice"
import currentRestaurantReducer from "./slices/currentRestaurant-slice"
import restaurantHistoryReducer from "./slices/restaurantHistory-slice";
import restaurantErrorReducer from "./slices/restaurantError-slice"
import favoritesReducer from "./slices/favorites-slice"

export const store = configureStore({
    reducer: {
        filterReducer,
        currentRestaurantReducer,
        restaurantHistoryReducer,
        restaurantErrorReducer,
        favoritesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
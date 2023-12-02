import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripAdvisorRestaurant, YelpRestaurant } from "@/util/restaurantTypes";
type RestaurantHistoryState = {
    restaurantHistory: (TripAdvisorRestaurant | YelpRestaurant)[]
}

type InitialState = {
    restaurantHistory: RestaurantHistoryState
}

const initialState: RestaurantHistoryState = {
    restaurantHistory: []
}

export const restaurantHistory = createSlice({
    name: "restaurantHistory",
    initialState,
    reducers: {
        setRestaurantHistory: (state, action: PayloadAction<YelpRestaurant | TripAdvisorRestaurant>) => {
            return ({
                ...state,
                restaurantHistory: [...state.restaurantHistory, action.payload]
            })
        }
    }
})

export const { setRestaurantHistory } = restaurantHistory.actions
export default restaurantHistory.reducer
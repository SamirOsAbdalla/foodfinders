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
            if (state.restaurantHistory.find(restaurant => {
                if (restaurant.name == action.payload.name) {
                    return true
                }
                return false
            }) != undefined) {
                return state
            }

            return ({
                restaurantHistory: [...state.restaurantHistory, action.payload]
            })
        }
    }
})

export const { setRestaurantHistory } = restaurantHistory.actions
export default restaurantHistory.reducer
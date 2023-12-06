import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorMessage, TripAdvisorRestaurant, YelpRestaurant } from "@/util/restaurantTypes";
type CurrentRestaurantState = {
    currentRestaurant?: TripAdvisorRestaurant | YelpRestaurant | ErrorMessage
}

type InitialState = {
    value: CurrentRestaurantState
}

const initialState = {
    value: {
        currentRestaurant: undefined
    }
} as InitialState

export const currentRestaurant = createSlice({
    name: "currentRestaurant",
    initialState,
    reducers: {
        setCurrentRestaurant: (state, action: PayloadAction<CurrentRestaurantState>) => {
            return ({
                value: action.payload
            })
        }
    }
})

export const { setCurrentRestaurant } = currentRestaurant.actions
export default currentRestaurant.reducer
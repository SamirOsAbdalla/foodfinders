import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

type ErrorState = boolean

type InitialState = {
    value: ErrorState
}

const initialState = {
    value: false
} as InitialState

export const restaurantError = createSlice({
    name: "restaurantError",
    initialState,
    reducers: {
        setRestaurantError: (state, action: PayloadAction<ErrorState>) => {
            return ({
                value: action.payload
            })
        }
    }
})

export const { setRestaurantError } = restaurantError.actions
export default restaurantError.reducer
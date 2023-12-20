import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripAdvisorRestaurant, YelpRestaurant } from "@/util/restaurantTypes";

type FavoriteState = (TripAdvisorRestaurant | YelpRestaurant)[]

type InitialState = {
    favorites: FavoriteState
}

const initialState = {
    favorites: []
} as InitialState

export const favorites = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<TripAdvisorRestaurant | YelpRestaurant>) => {
            return ({
                favorites: [...state.favorites, action.payload]
            })
        },
        removeFavorite: (state, action: PayloadAction<TripAdvisorRestaurant | YelpRestaurant>) => {
            return ({
                favorites: state.favorites.filter(favorite => favorite.id != action.payload.id)
            })
        }
    }
})

export const { addFavorite, removeFavorite } = favorites.actions
export default favorites.reducer
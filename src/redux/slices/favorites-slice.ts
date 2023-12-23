import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripAdvisorRestaurant, YelpRestaurant } from "@/util/restaurantTypes";

type FavoriteState = (TripAdvisorRestaurant | YelpRestaurant)[]

type InitialState = {
    favorites: FavoriteState,
    favoritesEmail: string
}

const initialState = {
    favorites: [],
    favoritesEmail: ""

} as InitialState

export const favorites = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<TripAdvisorRestaurant | YelpRestaurant>) => {
            return ({
                favorites: [...state.favorites, action.payload],
                favoritesEmail: state.favoritesEmail
            })
        },
        removeFavorite: (state, action: PayloadAction<string | number>) => {
            return ({
                favorites: state.favorites.filter(favorite => favorite.id != action.payload),
                favoritesEmail: state.favoritesEmail
            })
        },
        setFavoritesEmail: (state, action: PayloadAction<string>) => {
            return ({
                favorites: state.favorites,
                favoritesEmail: action.payload
            })
        },
        setFavorites: (state, action: PayloadAction<(TripAdvisorRestaurant | YelpRestaurant)[]>) => {
            return ({
                favorites: action.payload,
                favoritesEmail: state.favoritesEmail
            })
        }
    }
})

export const { addFavorite, removeFavorite, setFavoritesEmail, setFavorites } = favorites.actions
export default favorites.reducer
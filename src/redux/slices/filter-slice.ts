import { AcceptedFoodFilters, FiltersObject, PossiblePrices } from "@/util/restaurantTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type InitialState = {
    value: FiltersObject
}
const initialState = {
    value: {
        cuisines: [],
        prices: [],
        filterDistance: "13"
    }
} as InitialState

export const filter = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FiltersObject>) => {
            return ({
                value: action.payload
            })
        }
    }
})

export const { setFilters } = filter.actions
export default filter.reducer
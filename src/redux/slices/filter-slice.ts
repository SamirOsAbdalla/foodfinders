import { AcceptedFoodFilters, PossiblePrices } from "@/util/restaurantTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
    cuisines: AcceptedFoodFilters[],
    prices: PossiblePrices[]
}

type InitialState = {
    value: FilterState
}
const initialState = {
    value: {
        cuisines: [],
        prices: []
    }
} as InitialState

export const filter = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<FilterState>) => {
            return ({
                value: action.payload
            })
        }
    }
})

export const { setFilters } = filter.actions
export default filter.reducer
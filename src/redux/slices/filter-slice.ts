import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PriceType = '$' | "$$" | "$$$" | "$$$$"

export type FilterState = {
    cuisine: string[],
    prices: PriceType[]
}

type InitialState = {
    value: FilterState
}
const initialState = {
    value: {
        cuisine: [],
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
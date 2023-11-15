import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterState = {
    foodTypes: string[],
    mainOptions: string[]
}
type InitialState = {
    value: FilterState
}
const initialState = {
    value: {
        foodTypes: [],
        mainOptions: []
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
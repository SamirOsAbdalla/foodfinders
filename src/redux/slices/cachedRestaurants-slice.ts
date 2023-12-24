import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorMessage, PossibleApisStrict, TripAdvisorRestaurant, YelpRestaurant } from "@/util/restaurantTypes";
import { defaultDistanceRadius } from "@/util/constants";

type CachedRestaurantState = {
    cachedRestaurants: YelpRestaurant[],
    currentApiType: PossibleApisStrict,
    prevYelpFilters: {
        isDefault: boolean,
        prevPricesString: string,
        prevCuisinesString: string,
        prevDistance: string
    }
}

type InitialState = {
    value: CachedRestaurantState
}

export const defaultPrevYelpFilters = {
    isDefault: true,
    prevPricesString: "",
    prevCuisinesString: "",
    prevDistance: defaultDistanceRadius
}

const initialState = {
    value: {
        cachedRestaurants: [],
        currentApiType: "yelp",
        prevYelpFilters: {
            isDefault: true,
            prevPricesString: "",
            prevCuisinesString: "",
            prevDistance: defaultDistanceRadius
        }
    }
} as InitialState


export const cachedRestaurants = createSlice({
    name: "cachedRestaurants",
    initialState,
    reducers: {
        setCachedRestaurants: (state, action: PayloadAction<CachedRestaurantState>) => {

            return ({
                value: action.payload
            })
        },
        popCachedRestaurant: (state) => {
            if (state.value.cachedRestaurants.length == 1) {
                let currentApiType: PossibleApisStrict = state.value.currentApiType == "yelp" ? "tripadvisor" : "yelp"

                return ({
                    value: {
                        cachedRestaurants: [],
                        currentApiType,
                        prevYelpFilters: defaultPrevYelpFilters
                    }
                })
            }

            return ({
                value: {
                    cachedRestaurants: state.value.cachedRestaurants.slice(0, -1),
                    currentApiType: state.value.currentApiType,
                    prevYelpFilters: state.value.prevYelpFilters
                }
            })
        }
    }
})

export const { setCachedRestaurants, popCachedRestaurant } = cachedRestaurants.actions
export default cachedRestaurants.reducer
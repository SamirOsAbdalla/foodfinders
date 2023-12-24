"use client"
import "./BigButton.css"
import { useState } from "react"
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { currentRestaurant, setCurrentRestaurant } from "@/redux/slices/currentRestaurant-slice";
import { setRestaurantHistory } from "@/redux/slices/restaurantHistory-slice";
import { setRestaurantError } from "@/redux/slices/restaurantError-slice";
import { YelpRestaurant } from "@/util/restaurantTypes";
import { popCachedRestaurant, setCachedRestaurants } from "@/redux/slices/cachedRestaurants-slice";
import { FiltersObject } from "@/util/restaurantTypes";
import { mapPricesToNumberString } from "@/util/getRestaurant";
import { defaultDistanceRadius } from "@/util/constants";
import { defaultPrevYelpFilters } from "@/redux/slices/cachedRestaurants-slice";

function arePrevFiltersASubset(filtersObject: FiltersObject, prevYelpFilters: any) {

    //We must make the API call since the previous filters are too general for the current call
    if (prevYelpFilters.isDefault &&
        (filtersObject.prices.length > 0 ||
            filtersObject.cuisines.length > 0 ||
            parseInt(filtersObject.filterDistance) <= parseInt(defaultDistanceRadius))) {

        return false
    }

    let prevPricesString = prevYelpFilters.prevPricesString
    let prevCuisinesString = prevYelpFilters.prevCuisinesString
    let currentPricesString = mapPricesToNumberString(filtersObject.prices)
    let currentCuisinesString = filtersObject.cuisines.sort().join(",").toLowerCase()

    if (currentPricesString.includes(prevPricesString)
        && currentCuisinesString.includes(prevCuisinesString)
        && parseInt(filtersObject.filterDistance) >= parseInt(prevYelpFilters.prevDistance)) {
        return true
    }
    return false
}

function useGeoLocation() {
    const reduxFilterState = useSelector((state: RootState) => state.filterReducer.value)
    const reduxCacheState = useSelector((state: RootState) => state.cachedRestaurantsReducer.value)

    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState<boolean>(false)

    const geolocationSuccess = async (position: GeolocationPosition) => {
        setLoading(true)

        const currentFiltersObject: FiltersObject = {
            prices: reduxFilterState.prices,
            cuisines: reduxFilterState.cuisines,
            filterDistance: reduxFilterState.filterDistance
        }

        if (
            reduxCacheState.cachedRestaurants.length > 0 &&
            arePrevFiltersASubset(currentFiltersObject, reduxCacheState.prevYelpFilters)) {

            if (reduxCacheState.currentApiType == "yelp") {
                let cachedRestaurant = reduxCacheState.cachedRestaurants[reduxCacheState.cachedRestaurants.length - 1] as YelpRestaurant
                dispatch(setCurrentRestaurant({ currentRestaurant: cachedRestaurant }))
                dispatch(setRestaurantHistory(cachedRestaurant))
                dispatch(popCachedRestaurant())
            }
            setLoading(false)
            return
        }

        const cuisineString = reduxFilterState.cuisines.join(",")
        const pricesString = reduxFilterState.prices.join(",")
        const filterDistance = reduxFilterState.filterDistance

        const coords = position.coords

        let initialApiToFetch = reduxCacheState.currentApiType
        const fetchUrl = `/api/getNearbyRestaurant?` +
            `latitude=${coords.latitude}&longitude=${coords.longitude}` +
            `${cuisineString ? ("&cuisineString=" + cuisineString) : ""}` +
            `${pricesString ? ("&pricesString=" + pricesString) : ""}` +
            `${filterDistance ? ("&filterDistance=" + filterDistance) : "13"}` +
            `&initialApiToFetch=${initialApiToFetch}`

        const restaurants = await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const restaurantsJSON = await restaurants.json()
        if (!("error" in restaurantsJSON)) {

            //we got yelp results back
            if (Array.isArray(restaurantsJSON)) {
                let currentRestaurant = restaurantsJSON.pop()

                let filterString = reduxFilterState.cuisines.sort().join(",").toLowerCase()
                let pricesString = mapPricesToNumberString(reduxFilterState.prices)
                const newIsDefault = (
                    filterString == "" &&
                    pricesString == "" &&
                    filterDistance == defaultDistanceRadius
                )

                let prevYelpFilters = {
                    isDefault: newIsDefault,
                    prevCuisinesString: filterString,
                    prevPricesString: pricesString,
                    prevDistance: filterDistance
                }

                dispatch(setCachedRestaurants({ cachedRestaurants: restaurantsJSON, currentApiType: "yelp", prevYelpFilters }))
                dispatch(setCurrentRestaurant({ currentRestaurant }))
                dispatch(setRestaurantHistory(currentRestaurant))
            } else {
                dispatch(setCachedRestaurants({ cachedRestaurants: [], currentApiType: "yelp", prevYelpFilters: defaultPrevYelpFilters }))
                dispatch(setCurrentRestaurant({ currentRestaurant: restaurantsJSON }))
                dispatch(setRestaurantHistory(restaurantsJSON))
            }
        } else {
            dispatch(setRestaurantError(true))
        }
        setLoading(false)
    }

    const geolocationError = (error: GeolocationPositionError) => {
        console.log("Error: Could not fetch user coordinates")
    }

    const handleBigButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
        }
    }

    return {
        handleBigButtonClick,
        loading
    }
}

interface Props {
    buttonSize: "small" | "main"
    colorType?: "yelp" | "tripadvisor"
}

export default function BigButton({
    buttonSize,
    colorType
}: Props) {

    const {
        loading,
        handleBigButtonClick
    } = useGeoLocation()


    return (
        <div className={`big-button__wrapper big-button__wrapper--${buttonSize}`}>
            <div onClick={handleBigButtonClick} className={`big-button__container big-button__container--${buttonSize} ${loading == true && "big-button__container--loading"} ${colorType && `container--${colorType}`} d-flex align-items-center justify-content-center`}>
                <button className={`big-button big-button--${buttonSize} ${colorType && `button--${colorType}`} ${loading == true && "big-button--loading"}`}>
                    <IoFastFoodOutline className={`fast-food__icon fast-food__icon--${buttonSize}`} />
                </button>
            </div>
        </div>
    )
}

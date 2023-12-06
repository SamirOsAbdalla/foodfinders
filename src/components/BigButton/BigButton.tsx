"use client"
import "./BigButton.css"
import { useState } from "react"
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setCurrentRestaurant } from "@/redux/slices/currentRestaurant-slice";
import { setRestaurantHistory } from "@/redux/slices/restaurantHistory-slice";


interface Props {
    buttonSize: "small" | "main"
}

function useGeoLocation() {
    const reduxFilterState = useSelector((state: RootState) => state.filterReducer.value)
    const dispatch = useDispatch<AppDispatch>()

    const [loading, setLoading] = useState<boolean>(false)

    const geolocationSuccess = async (position: GeolocationPosition) => {
        setLoading(true)
        const coords = position.coords

        const cuisineString = reduxFilterState.cuisines.join(",")
        const pricesString = reduxFilterState.prices.join(",")
        const fetchUrl = `/api/getNearbyRestaurant?` +
            `latitude=${coords.latitude}&longitude=${coords.longitude}` +
            `${cuisineString ? ("&cuisineString=" + cuisineString) : ""}` +
            `${pricesString ? ("&pricesString=" + pricesString) : ""}`

        const restaurant = await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })

        const restaurantJSON = await restaurant.json()
        dispatch(setCurrentRestaurant({ currentRestaurant: restaurantJSON }))
        if (!("errorMessage" in restaurantJSON)) {
            dispatch(setRestaurantHistory(restaurantJSON))
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

export default function BigButton({ buttonSize }: Props) {

    const {
        loading,
        handleBigButtonClick
    } = useGeoLocation()

    return (
        <div className={`big-button__wrapper big-button__wrapper--${buttonSize}`}>
            <div onClick={handleBigButtonClick} className={`big-button__container big-button__container--${buttonSize} ${loading == true && "big-button__container--loading"} d-flex align-items-center justify-content-center`}>
                <button className={`big-button big-button--${buttonSize} ${loading == true && "big-button--loading"}`}>
                    <IoFastFoodOutline className={`fast-food__icon fast-food__icon--${buttonSize}`} />
                </button>
            </div>
        </div>
    )
}

"use client"
import "./BigButton.css"
import { useState } from "react"
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setCurrentRestaurant } from "@/redux/slices/currentRestaurant-slice";
import { setRestaurantHistory } from "@/redux/slices/restaurantHistory-slice";
interface Props {
    buttonSize: "small" | "regular"
}
export default function BigButton({ buttonSize }: Props) {

    const reduxFilterState = useSelector((state: RootState) => state.filterReducer.value)
    const dispatch = useDispatch<AppDispatch>()
    const [userLocation, setUserLocation] = useState<{ latitude: Number, longitude: number } | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const geolocationSuccess = async (position: GeolocationPosition) => {
        setLoading(true)
        const coords = position.coords
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude })

        const cuisineString = reduxFilterState.cuisine.join(",")
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
        if ("errorMessage" in restaurantJSON) {
            //handle error
        }
        dispatch(setCurrentRestaurant(restaurantJSON))
        dispatch(setRestaurantHistory(restaurantJSON))
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
    return (
        <div className={`bigbutton__wrapper bigbutton__wrapper__${buttonSize}`}>
            <div onClick={handleBigButtonClick} className={`bigbutton__container bigbutton__container__${buttonSize} ${loading == true && "bigbutton__container__loading"} d-flex align-items-center justify-content-center`}>
                <button className={`bigbutton bigbutton__${buttonSize} ${loading == true && "bigbutton__loading"}`}>
                    <IoFastFoodOutline className={`fastfood__icon fastfood__icon__${buttonSize}`} />
                </button>
            </div>
        </div>
    )
}

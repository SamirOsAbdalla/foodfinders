"use client"
import "./BigButton.css"
import { useState } from "react"
import { IoFastFoodOutline } from "react-icons/io5";

export default function BigButton() {

    const [userLocation, setUserLocation] = useState<{ latitude: Number, longitude: number } | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const geolocationSuccess = async (position: GeolocationPosition) => {
        const coords = position.coords
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude })
        setLoading(true)

        const restaurant = await fetch(`/api/getNearbyRestaurant?latitude=${coords.latitude}&longitude=${coords.longitude}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },

        })

        const restaurantJSON = await restaurant.json()

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
        <div className={`bigbutton__wrapper ${loading == false && "bigbutton__loading"}`}>
            <div className="bigbutton__container d-flex align-items-center justify-content-center">
                <button onClick={handleBigButtonClick} className="bigbutton">
                    <IoFastFoodOutline className="fastfood__icon" />
                </button>
            </div>

        </div>
    )
}

"use client"
import "./BigButton.css"
import { useState } from "react"

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
            <button onClick={handleBigButtonClick} className="bigbutton">
                FIND FOOD
            </button>
        </div>
    )
}

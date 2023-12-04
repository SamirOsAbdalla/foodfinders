"use client"
import BigButton from '@/components/BigButton/BigButton'
import "./MainPage.css"
import Instructions from '../Instructions/Instructions'
import RestaurantHistory from '../RestaurantHistory/RestaurantHistory'
import { TripAdvisorRestaurant, YelpRestaurant } from '@/util/restaurantTypes'
import YelpDisplay from '../Yelp/YelpDisplay/YelpDisplay'
import TripAdvisorDisplay from '../TripAdvisor/TripAdvisorDisplay/TripAdvisorDisplay'
import { useSelector } from "react-redux";
import { RootState } from '@/redux/store'
import { useEffect, useState } from 'react'

export default function MainPage() {
    let reduxRestaurant = useSelector((state: RootState) => state.currentRestaurantReducer.value)

    return (
        <section className="mainpage__wrapper">
            {("currentRestaurant" in reduxRestaurant) &&
                <>
                    <BigButton buttonSize='main' />
                    <div className="break"></div>
                    <Instructions />
                </>
            }
            {reduxRestaurant && ("yelpType" in reduxRestaurant) &&
                <YelpDisplay {...reduxRestaurant as YelpRestaurant} />
            }
            {reduxRestaurant && ("taType" in reduxRestaurant) &&
                <TripAdvisorDisplay {...reduxRestaurant as TripAdvisorRestaurant} />
            }

        </section>
    )
}

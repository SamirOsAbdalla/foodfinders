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
import HomePage from '../HomePage/HomePage'

export default function MainPage() {
    let reduxRestaurant = useSelector((state: RootState) => state.currentRestaurantReducer.value)


    return (
        <section className="main-page__wrapper">
            {(!reduxRestaurant.currentRestaurant || reduxRestaurant.currentRestaurant.apiRespOrigin == "error") &&
                <HomePage />
            }
            {reduxRestaurant && (reduxRestaurant.currentRestaurant?.apiRespOrigin == "yelp") &&
                <YelpDisplay {...reduxRestaurant.currentRestaurant as YelpRestaurant} />
            }

            {reduxRestaurant && (reduxRestaurant.currentRestaurant?.apiRespOrigin == "tripadvisor") &&
                <TripAdvisorDisplay {...reduxRestaurant.currentRestaurant as TripAdvisorRestaurant} />
            }

        </section>
    )
}

"use client"
import React from 'react'
import { useState } from 'react';
import "./RestaurantHistory.css"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HistoryItem from './HistoryItem';
import { TripAdvisorRestaurant, YelpRestaurant } from '@/util/restaurantTypes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCurrentRestaurant } from '@/redux/slices/currentRestaurant-slice';
import { metersToMiles } from '@/util/constants';
import SearchInput from '../SearchInput/SearchInput';

const getFilteredItems = (items: (YelpRestaurant | TripAdvisorRestaurant)[], filter: string) => {
    const lowercaseFilter = filter.toLowerCase()
    return items.filter(item => {
        return item.name?.toLowerCase().includes(lowercaseFilter)
    })
}

export default function RestaurantHistory() {
    const restaurantHistory = useSelector((state: RootState) => state.restaurantHistoryReducer.restaurantHistory)
    const dispatch = useDispatch<AppDispatch>()

    const [filter, setFilter] = useState<string>("")

    const returnClickHandler = (restaurant: YelpRestaurant | TripAdvisorRestaurant) => {
        if (restaurant.apiRespOrigin == "tripadvisor") {
            return function clickHandler() {
                dispatch(setCurrentRestaurant({ currentRestaurant: restaurant }))
            }
        }
        // Basically this function accounts for the fact that the person may have moved
        // a considerable distance since the last time they viewed the restaurant and thus
        // the distance needs to be updated
        const geolocationSuccess = (position: GeolocationPosition) => {
            restaurant = restaurant as YelpRestaurant
            const split = restaurant.latitudeAndLongitude?.split("&")!

            const lat1 = position.coords.latitude
            const lon1 = position.coords.longitude
            const lat2 = parseFloat(split[0])
            const lon2 = parseFloat(split[1])


            function toRad(num: number) {
                return num * Math.PI / 180
            }
            let R = 6371; // Radius of the earth in km
            let dLat = toRad(lat2 - lat1);  // Javascript functions in radians
            let dLon = toRad(lon2 - lon1);
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = R * c; // Distance in km

            dispatch(setCurrentRestaurant({ currentRestaurant: { ...restaurant, distance: (d * 1000) * metersToMiles } }))
        }

        const geolocationError = () => {
            console.log("error in restaurant histroy")
        }

        return function clickHandler() {
            if (restaurant.latitudeAndLongitude) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
                }
            }
        }

    }

    return (
        <div className="rh__wrapper">
            <div className="rh__heading w-100 d-flex justify-content-between align-items-center">
                Restaurant History
                <SearchInput
                    value={filter}
                    setValue={setFilter}
                />
            </div>
            <div className="rh__item__container">
                {getFilteredItems(restaurantHistory, filter).map(restaurant => {
                    return (
                        <HistoryItem
                            clickHandler={returnClickHandler(restaurant)}
                            key={restaurant.name}
                            name={restaurant.name}
                            rating={restaurant.rating}
                            reviewCount={restaurant.reviewCount}
                            apiRespOrigin={restaurant.apiRespOrigin}
                        />
                    )
                })}
            </div>
        </div>
    )
}

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

    // let test: YelpRestaurant = {
    //     name: 'Crying Tiger Thai Bistro & Bar',
    //     restaurantImageUrl: 'https://s3-media4.fl.yelpcdn.com/bphoto/yHlQa6PFTRjMy2aXN2IJMA/o.jpg',
    //     rating: 4,
    //     phoneNumber: '+19093210331',
    //     price: '$$',
    //     address: '3430 Ontario Ranch Rd Ste 4 Ontario, CA 91761',
    //     yelpType: 'yelp',
    //     yelpWebsiteUrl: 'https://www.yelp.com/biz/shootz-ontario-3?adjust_creative=vRLSvzbnXCwqOz85TNqaBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vRLSvzbnXCwqOz85TNqaBg',
    //     reviewCount: 373,
    //     categories: [
    //         { alias: 'hawaiian', title: 'Hawaiian' },
    //         { alias: 'comfortfood', title: 'Comfort Food' },
    //         { alias: 'bbq', title: 'Barbeque' }
    //     ],
    //     latitudeAndLongitude: '34.0000524&-117.578382'
    // }

    return (
        <section className="main-page__wrapper">
            {(!reduxRestaurant.currentRestaurant) &&
                <>
                    <BigButton buttonSize='main' />
                    <div className="break"></div>
                    <Instructions />
                </>
            }
            {reduxRestaurant && (reduxRestaurant.currentRestaurant?.apiRespOrigin == "yelp") &&
                <YelpDisplay {...reduxRestaurant.currentRestaurant as YelpRestaurant} />
            }

            {/* <YelpDisplay {...test} /> */}

            {reduxRestaurant && (reduxRestaurant.currentRestaurant?.apiRespOrigin == "tripadvisor") &&
                <TripAdvisorDisplay {...reduxRestaurant.currentRestaurant as TripAdvisorRestaurant} />
            }

        </section>
    )
}

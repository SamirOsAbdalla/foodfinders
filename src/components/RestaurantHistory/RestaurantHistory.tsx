"use client"
import React from 'react'
import { useState } from 'react';
import "./RestaurantHistory.css"
import { TiStarFullOutline } from "react-icons/ti";

const testData = [
    {
        name: 'The Boil Dadd - Corona',
        restaurantImageUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/UPX2Oyeims-VIZhntFCEqQ/o.jpg',
        rating: 4.5,
        phoneNumber: '+19515318029',
        price: "$$$$",
        address: '490 Hidden Valley Pkwy Ste 102 Corona, CA 92879',
        apiRespOrigin: 'yelp',
        yelpWebsiteUrl: 'https://www.yelp.com/biz/the-boil-daddy-corona-corona-3?adjust_creative=vRLSvzbnXCwqOz85TNqaBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vRLSvzbnXCwqOz85TNqaBg',
        reviewCount: 4850,
        categories: [
            { alias: 'cajun', title: 'Cajun/Creole' },
            { alias: 'seafood', title: 'Seafood' },
            { alias: 'chicken_wings', title: 'Chicken Wings' }
        ],
        distance: "9942.805026107226"
    },
    {
        name: 'The Boil Daddy - Corona',
        restaurantImageUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/UPX2Oyeims-VIZhntFCEqQ/o.jpg',
        rating: 4.5,
        phoneNumber: '+19515318029',
        price: "$$$$",
        address: '490 Hidden Valley Pkwy Ste 102 Corona, CA 92879',
        apiRespOrigin: 'yelp',
        yelpWebsiteUrl: 'https://www.yelp.com/biz/the-boil-daddy-corona-corona-3?adjust_creative=vRLSvzbnXCwqOz85TNqaBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vRLSvzbnXCwqOz85TNqaBg',
        reviewCount: 4850,
        categories: [
            { alias: 'cajun', title: 'Cajun/Creole' },
            { alias: 'seafood', title: 'Seafood' },
            { alias: 'chicken_wings', title: 'Chicken Wings' }
        ],
        distance: "9942.805026107226"
    }
]
export default function RestaurantHistory() {
    return (
        <div className="rh__wrapper">
            <div className="rh__heading w-100 d-flex justify-content-start align-items-center">
                Restaurant History
            </div>
            <div className="rh__history__item__container d-flex flex-column gap-5">
                {testData.map(data => {
                    return (
                        <div className="rh__history__item gap-2 d-flex flex-column" key={data.name}>
                            <span className="rh__name">{data.name}</span>
                            <div className="rh__bottom__text d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center justify-content-start gap-1">
                                    <div className="d-flex align-items-center justify-content-start gap-1">
                                        {data.rating}
                                        <TiStarFullOutline />
                                    </div>
                                    {data.reviewCount &&
                                        <div>
                                            {data.reviewCount} reviews
                                        </div>
                                    }
                                </div>
                                <div>
                                    {data.apiRespOrigin &&
                                        <span>{data.apiRespOrigin[0].toUpperCase() + data.apiRespOrigin.slice(1)}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

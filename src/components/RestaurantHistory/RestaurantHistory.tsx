"use client"
import React from 'react'
import { useState } from 'react';
import "./RestaurantHistory.css"
import { TiStarFullOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function RestaurantHistory() {
    const restaurantHistory = useSelector((state: RootState) => state.restaurantHistoryReducer.restaurantHistory)

    return (
        <div className="rh__wrapper">
            <div className="rh__heading w-100 d-flex justify-content-start align-items-center">
                Restaurant History
            </div>
            <div className="rh__history__item__container d-flex flex-column gap-5">
                {restaurantHistory.map(data => {
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
                                    {("yelpWebsiteUrl" in data) &&
                                        <span>Yelp</span>
                                    }
                                    {("tripAdvisorUrl" in data) &&
                                        <span>TripAdvisor</span>
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

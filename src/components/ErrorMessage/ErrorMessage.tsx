"use client"
import "./ErrorMessage.css"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { BiSolidError } from "react-icons/bi";
import { useDispatch } from "react-redux"
import { setRestaurantError } from "@/redux/slices/restaurantError-slice"
export default function ErrorMessage() {

    let restaurantError = useSelector((state: RootState) => state.restaurantErrorReducer.value)
    let dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (restaurantError) {
            setTimeout(() => {
                dispatch(setRestaurantError(false))
            }, 3000)
        }

    }, [restaurantError])

    if (!restaurantError) {
        return <></>
    }

    return (
        <div className="error__wrapper">
            <BiSolidError className="error__icon" />
            <div className="error__message">
                <span className="error__message__header">Ooops!</span>
                <span>Could not find restaurants with current filters</span>
            </div>
        </div>
    )
}

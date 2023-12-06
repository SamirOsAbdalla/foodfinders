"use client"
import "./ErrorMessage.css"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { BiSolidError } from "react-icons/bi";
import { useDispatch } from "react-redux"
import { setCurrentRestaurant } from "@/redux/slices/currentRestaurant-slice"
export default function ErrorMessage() {

    let reduxRestaurant = useSelector((state: RootState) => state.currentRestaurantReducer.value)
    let dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (reduxRestaurant.currentRestaurant?.apiRespOrigin == "error") {
            setTimeout(() => {
                dispatch(setCurrentRestaurant({ currentRestaurant: undefined }))
            }, 1500)
        }

    }, [reduxRestaurant])

    if (!(reduxRestaurant.currentRestaurant?.apiRespOrigin == "error")) {
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

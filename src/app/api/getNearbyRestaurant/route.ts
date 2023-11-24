import { NextRequest, NextResponse } from "next/server"
import { AcceptedFoodFilters, PriceRanges } from "restaurants-api-wrapper"
const getANearbyRestaurant = require("restaurants-api-wrapper")



export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")
    const cuisineString = searchParams.get("cuisineString")
    const pricesString = searchParams.get("pricesString")

    let foodTypesArray: any[] = []
    let pricesArray: any[] = []

    if (cuisineString) {
        foodTypesArray = cuisineString.split(",")
    }
    if (pricesString) {
        pricesArray = pricesString.split(",")
    }

    const apiKeyBundler = {
        yelpKey: process.env.NEXT_PUBLIC_YELP_API_KEY,
        tripAdvisorKey: process.env.NEXT_PUBLIC_TA_API_KEY,
        tomTomKey: process.env.NEXT_PUBLIC_TOMTOM_API_KEY
    }
    const coordinates = { latitude, longitude }

    const filtersObject = {
        prices: pricesArray,
        foodTypes: foodTypesArray
    }

    const response = await getANearbyRestaurant(coordinates, apiKeyBundler, filtersObject)
    console.log("RESPONSE", response)

    return Response.json(null)
}
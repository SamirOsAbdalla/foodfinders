import { NextRequest, NextResponse } from "next/server"
import getANearbyRestaurant from "@/util/getRestaurant"

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
    let coordinates = {
        latitude: 0,
        longitude: 0
    }
    if (latitude && longitude) {
        coordinates = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }
    }

    const filtersObject = {
        prices: pricesArray,
        foodTypes: foodTypesArray
    }
    const response = await getANearbyRestaurant(coordinates, apiKeyBundler, filtersObject)
    return Response.json(response)
}
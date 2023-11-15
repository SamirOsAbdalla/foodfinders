import { NextRequest, NextResponse } from "next/server"


const yelpURL = `https://api.yelp.com/v3/businesses/search?sort_by=best_match&latitude=37.773972&longitude=-122.431297&limit=20`
export async function GET(request: Request) {
    const apiOptions = {
        method: 'GET',
        headers: {
            "Accept": 'application/json',
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`
        }
    }
    const response = await fetch(yelpURL, apiOptions)
    return Response.json(await response.json())
}
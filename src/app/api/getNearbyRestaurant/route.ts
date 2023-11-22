import { NextRequest, NextResponse } from "next/server"



// const baseYelpURL = `https://api.yelp.com/v3/businesses/search?sort_by=best_match`
// export async function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams
//     const latitude = searchParams.get("latitude")
//     const longitude = searchParams.get("longitude")
//     const apiOptions = {
//         method: 'GET',
//         headers: {
//             "Accept": 'application/json',
//             "Authorization": `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`
//         }
//     }
//     const taOptions = {
//         method: "GET",
//         headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TA_API_KEY}`
//         }
//     }
//     if (latitude && longitude) {
//         const fetchURL = baseYelpURL + `&latitude=${latitude}&longitude=${longitude}&limit=20`
//         const response = await fetch(fetchURL, apiOptions)
//         const response1 = await fetch(`https://api.content.tripadvisor.com/api/v1/location/nearby_search?key=${process.env.NEXT_PUBLIC_TA_API_KEY}&latLong=${latitude},${longitude}`, taOptions)
//         console.log(await response1.json())
//         return Response.json(await response.json())
//     }

// }

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    return Response.json(null)
}
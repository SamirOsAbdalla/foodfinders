import {
    baseYelpURL,
    baseTripAdvisorURL,
    unitedStatesLatitudeMin,
    unitedStatesLatitudeMax,
    unitedStatesLongitudeMin,
    unitedStatesLongitudeMax,
    errorMessage,
    defaultDistanceRadius,
    metersToMiles,
    milesToMeters,
} from "./constants"

import {
    ApiKeyBundler,
    YelpRestaurant,
    Coordinates,
    FiltersObject,
    TripAdvisorRestaurant,
    AcceptedFoodFilters,
    ErrorMessage,
    PossiblePrices
} from "./restaurantTypes"



// e.g. [$,$$,$$$$] -> 1,2,4
export function mapPricesToNumberString(priceArr: PossiblePrices[]) {
    let new_arr: number[] = []

    for (let i = 0; i < priceArr.length; i++) {
        if (priceArr[i] == "$") {
            new_arr.push(1)
        } else if (priceArr[i] == "$$") {
            new_arr.push(2)
        } else if (priceArr[i] == "$$$") {
            new_arr.push(3)
        } else if (priceArr[i] == "$$$$") {
            new_arr.push(4)
        }
    }
    new_arr.sort()
    return new_arr.join(",")
}

/*This function is responsible for determining whether or not the filters in the previous api call
are a subset of the filters in the current call. This way we can use the cache without having to make
another API call*/

async function getYelpNearby(coordinates: Coordinates, yelpKey: string, filtersObject: FiltersObject) {

    const yelpHTTPOptions = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${yelpKey}`,
            "Cache": "no-store"
        }
    }
    const cuisinesArray = filtersObject.cuisines
    const pricesArray = filtersObject.prices

    //setup categories for yelp URL
    let filterString = ""
    if (cuisinesArray) {
        //Yelp requires the category string to be of the form: Food1,Food2,...FoodN
        filterString = cuisinesArray.sort().join(",").toLowerCase()
    }

    //Example of a yelp price string: 1,2,4
    let pricesString = mapPricesToNumberString(pricesArray)

    const { latitude, longitude } = coordinates

    let yelpRadius = (parseInt(filtersObject.filterDistance) * milesToMeters).toFixed(0)

    let limit = 50;

    //1000 is max number of results yelpApi can get at once
    let randomOffset = parseInt((Math.random() * (100 - limit)).toString())

    const yelpFetchUrl = baseYelpURL +
        `&radius=${yelpRadius}&open_now=true` +
        `${filterString ? `&categories=${filterString}` : ""}` +
        `${pricesString ? `&price=${pricesString}` : ""}` +
        `&latitude=${latitude}&longitude=${longitude}&limit=${limit}&offset=${randomOffset}`

    const yelpResp = await fetch(yelpFetchUrl, yelpHTTPOptions)
    const yelpRespJSON = await yelpResp?.json()

    if (!yelpRespJSON?.businesses) {
        return errorMessage
    }

    //Clean data so return object is easily obtainable from cache
    let yelpCache: any[] = []
    yelpRespJSON?.businesses?.forEach((business: any) => {
        if (business.rating && business.rating >= 2.5) {
            const address = business.location.display_address.join(" ")
            const coordinates = business.coordinates
            const latitudeAndLongitude = coordinates.latitude + `&${coordinates.longitude}`

            let distance = business.distance ?? undefined
            if (distance) {
                distance *= metersToMiles
            }

            let yelpRestaurant: YelpRestaurant = {
                id: business.id,
                apiRespOrigin: 'yelp',
                name: business.name,
                restaurantImageUrl: business.image_url,
                rating: business.rating,
                phoneNumber: business.phone,
                price: business.price,
                address,
                yelpWebsiteUrl: business.url,
                reviewCount: business.review_count,
                categories: business.categories,
                latitudeAndLongitude,
                distance
            }

            yelpCache.push(yelpRestaurant)
        }
    })

    if (yelpCache.length > 0) {
        randomizeArray(yelpCache)
        return yelpCache
    } else {
        return errorMessage
    }
}

const randomizeArray = (curArr: any[]) => {
    //randomize array
    let p1
    let p2;
    let p3;

    p2 = curArr.length; while (p2) p1 = Math.random() * p2-- | 0, p3 = curArr[p2], curArr[p2] = curArr[p1], curArr[p1] = p3
}


//Since we can only get valuable information from making a seperate API call, I just made
//this util function to handle the API request
async function fetchTripAdvisorResult(tripAdvisorFetchUrl: string, tripAdvisorHTTPOptions: any, placeId: string, tripAdvisorKey: string) {

    // Fetching main information
    const singleTaItemResp = await fetch(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    const singleTaItemRespJSON = await singleTaItemResp.json()

    // Have to make seperate API call to fetch images
    const imageFetchUrl = baseTripAdvisorURL +
        `/${placeId}/photos?key=${tripAdvisorKey}`
    const imageResp = await fetch(imageFetchUrl, tripAdvisorHTTPOptions)
    let images = (await imageResp.json()).data[0]?.images
    let restaurantImageUrl;
    if (images) {
        if (images.original?.url) {
            restaurantImageUrl = images.original?.url
        } else if (images.large.url) {
            restaurantImageUrl = images.large.url
        }
    }

    let addressObj = singleTaItemRespJSON.address_obj
    let address = singleTaItemRespJSON?.address_obj?.address_string
    let latitudeAndLongitude = singleTaItemRespJSON.latitude + `&${singleTaItemRespJSON.longitude}`

    // Final Object
    let tripAdvisorRestaurant: TripAdvisorRestaurant = {
        id: singleTaItemRespJSON.location_id,
        apiRespOrigin: 'tripadvisor',
        name: singleTaItemRespJSON.name,
        address,
        tripAdvisorUrl: singleTaItemRespJSON.website,
        rating: singleTaItemRespJSON.rating,
        phoneNumber: singleTaItemRespJSON.phone,
        ratingImageUrl: singleTaItemRespJSON.rating_image_url,
        reviewCount: singleTaItemRespJSON.num_reviews,
        price: singleTaItemRespJSON.price_level,
        hours: singleTaItemRespJSON.hours?.weekday_text,
        restaurantImageUrl,
        latitudeAndLongitude
    }

    return tripAdvisorRestaurant
}

async function getTripAdvisorNearby(coordinates: Coordinates, tripAdvisorKey: string, filtersObject: FiltersObject) {

    const tripAdvisorHTTPOptions = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${tripAdvisorKey}`
        }
    }

    const { cuisines } = filtersObject


    const { latitude, longitude } = coordinates
    const cuisinesArray = filtersObject.cuisines
    let tripAdvisorResp;

    let filterString = ""
    //If filters are present perform a filter search
    if (cuisinesArray.length > 0) {

        filterString = cuisinesArray.sort().join(",")
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/search?key=${tripAdvisorKey}` +
            `&radius=${filtersObject.filterDistance}&radiusUnit=mi` +
            `&category=restaurants` +
            `&latLong=${latitude},${longitude}` +
            `&searchQuery=${filterString}`

        tripAdvisorResp = await fetch(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    } else {
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/nearby_search?key=${tripAdvisorKey}` +
            `&radius=${filtersObject.filterDistance}&radiusUnit=mi` +
            `&category=restaurants` +
            `&latLong=${latitude},${longitude}`
        tripAdvisorResp = await fetch(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    }

    const tripAdvisorRespJSON = await tripAdvisorResp.json()

    //Only need to store location id's. Have to store in this way
    //since TripAdvisor gives more info only for specific Location Detail Searches
    const data = tripAdvisorRespJSON?.data
    const dataLength = data.length ?? 0
    let tripAdvisorLocationArray = []

    for (let i = 0; i < dataLength; i++) {
        const locationId = data[i].location_id
        if (locationId) {
            tripAdvisorLocationArray.push(locationId)
        }
    }

    if (tripAdvisorLocationArray.length > 0) {
        randomizeArray(tripAdvisorLocationArray)
        let placeId = tripAdvisorLocationArray.pop().toString()
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/${placeId}/details?key=${tripAdvisorKey}`

        return await fetchTripAdvisorResult(tripAdvisorFetchUrl, tripAdvisorHTTPOptions, placeId, tripAdvisorKey)
    } else {
        return errorMessage
    }
}


async function getANearbyRestaurant(
    coordinates: Coordinates,
    apiKeyBundler: ApiKeyBundler,
    filtersObject: FiltersObject,
    initialApiToFetch: string
)
    : Promise<(TripAdvisorRestaurant) | YelpRestaurant[] | ErrorMessage> {


    if (coordinates.latitude == 0 || coordinates.longitude == 0) {
        return errorMessage
    }

    const { yelpKey, tripAdvisorKey } = apiKeyBundler


    //Order of priority goes: Prices Option Enabled -> nextApiType.
    //This is because TripAdvisor does not always provide a price rating
    const { prices } = filtersObject

    if (prices.length > 0 || initialApiToFetch == "yelp") {

        if (yelpKey) {
            const result = await getYelpNearby(coordinates, yelpKey, filtersObject)
            if (result && !("error" in result)) {
                return result
            }
        }

        //if yelp API fails then fall through to TA
        if (prices.length == 0 && tripAdvisorKey) {
            const result = await getTripAdvisorNearby(coordinates, tripAdvisorKey, filtersObject)
            if (result && !("error" in result)) {
                return result
            }
        }
        return errorMessage

    }
    else if (initialApiToFetch == "tripadvisor") {
        if (tripAdvisorKey) {
            const result = await getTripAdvisorNearby(coordinates, tripAdvisorKey, filtersObject)
            if (result && !("error" in result)) {
                return result
            }
        }

        if (yelpKey) {
            const result = await getYelpNearby(coordinates, yelpKey, filtersObject)
            if (result && !("error" in result)) {
                return result
            }
        }

        return errorMessage
    }
    return errorMessage
}

export default getANearbyRestaurant
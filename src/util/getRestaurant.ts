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


//Variable to help cycle through API's. If for some reason a user gets through
//all results of one API then the another API will be used
let nextApiType = "yelp"

let tripAdvisorCache: string[] = []
let prevTripAdvisorFilters = {
    prevCuisinesString: "",
}

let yelpCache: YelpRestaurant[] = []
let prevYelpFilters = {
    isDefault: true,
    prevPricesString: "",
    prevCuisinesString: "",
    prevDistance: defaultDistanceRadius
}

// e.g. [$,$$,$$$$] -> 1,2,4
function mapPricesToNumberString(priceArr: PossiblePrices[]) {
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
function arePrevFiltersASubset(filtersObject: FiltersObject) {

    //We must make the API call since the previous filters are too general for the current call
    if (prevYelpFilters.isDefault &&
        (filtersObject.prices.length > 0 || filtersObject.cuisines.length > 0 || filtersObject.filterDistance != defaultDistanceRadius)) {
        return false
    }

    let prevPricesString = prevYelpFilters.prevPricesString
    let prevCuisinesString = prevYelpFilters.prevCuisinesString
    let currentPricesString = mapPricesToNumberString(filtersObject.prices)
    let currentCuisinesString = filtersObject.cuisines.sort().join(",").toLowerCase()

    if (currentPricesString.includes(prevPricesString)
        && currentCuisinesString.includes(prevCuisinesString)
        && parseInt(filtersObject.filterDistance) >= parseInt(prevYelpFilters.prevDistance)) {
        return true
    }
    return false
}

const randomizeCache = (cacheType: string) => {
    //randomize array
    let p1
    let p2;
    let p3;
    let curArr: any[] = []
    if (cacheType == "yelp") {
        curArr = yelpCache
    } else {
        curArr = tripAdvisorCache
    }
    p2 = curArr.length; while (p2) p1 = Math.random() * p2-- | 0, p3 = curArr[p2], curArr[p2] = curArr[p1], curArr[p1] = p3
}


async function getYelpNearby(coordinates: Coordinates, yelpKey: string, filtersObject: FiltersObject) {

    if (arePrevFiltersASubset(filtersObject) && yelpCache.length > 0) {
        nextApiType = "yelp"

        //last cache element means go to next API
        if (yelpCache.length - 1 == 0) {
            nextApiType = "tripadvisor"
        }
        return yelpCache.pop()
    }

    //No subset/exhausted cache means make API call
    const yelpHTTPOptions = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${yelpKey}`
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

    const yelpFetchUrl = baseYelpURL +
        `&radius=${yelpRadius}&open_now=true` +
        `${filterString ? `&categories=${filterString}` : ""}` +
        `${pricesString ? `&price=${pricesString}` : ""}` +
        `&latitude=${latitude}&longitude=${longitude}&limit=14`

    const yelpResp = await fetch(yelpFetchUrl, yelpHTTPOptions)
    const yelpRespJSON = await yelpResp?.json()
    if (!yelpRespJSON?.businesses) {
        return errorMessage
    }

    //Clean data so return object is easily obtainable from cache
    yelpCache = []
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

    randomizeCache("yelp")
    if (yelpCache.length > 0) {

        //Although this may seem redundant the 'else' is accounting for the scenario where we have re-entered this function 
        //due to the user having filters AND the next api type was tripadvisor 
        if (yelpCache.length - 1 == 0) {
            nextApiType = "tripadvisor"
        } else {
            nextApiType = "yelp"
        }

        const newIsDefault = (filterString == "" && pricesString == "" && filtersObject.filterDistance == defaultDistanceRadius)

        prevYelpFilters = {
            isDefault: newIsDefault,
            prevCuisinesString: filterString,
            prevPricesString: pricesString,
            prevDistance: filtersObject.filterDistance
        }

        return yelpCache.pop()
    } else {
        return errorMessage
    }
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
        id: singleTaItemRespJSON.id,
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


function checkTripAdvisorFilterSubset(cuisines: AcceptedFoodFilters[]) {
    const curFoodStr = cuisines.sort().join(",").toLowerCase()
    const prevFoodStr = prevTripAdvisorFilters.prevCuisinesString
    if (prevFoodStr == "" && curFoodStr != "") {
        return false;
    }
    else if (curFoodStr == "" || curFoodStr.includes(prevTripAdvisorFilters.prevCuisinesString)) {
        return true
    }
    return false
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
    if (tripAdvisorCache.length > 0 && checkTripAdvisorFilterSubset(cuisines)) {
        if (tripAdvisorCache.length - 1 == 0) {
            nextApiType = "yelp"
        }

        const placeId = tripAdvisorCache.pop()!

        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/${placeId}/details?key=${tripAdvisorKey}`

        return fetchTripAdvisorResult(tripAdvisorFetchUrl, tripAdvisorHTTPOptions, placeId, tripAdvisorKey)
    }


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
    for (let i = 0; i < dataLength; i++) {
        const locationId = data[i].location_id
        if (locationId) {
            tripAdvisorCache.push(locationId)
        }
    }


    //Return last item if we actually found locations
    if (tripAdvisorCache.length > 0) {

        randomizeCache("tripadvisor")

        // update previous filters based off of current filters
        prevTripAdvisorFilters.prevCuisinesString = filterString.toLowerCase()
        let placeId = tripAdvisorCache.pop()!
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/${placeId}/details?key=${tripAdvisorKey}`


        if (tripAdvisorCache.length == 0) {
            nextApiType = "yelp"
        }

        prevTripAdvisorFilters.prevCuisinesString = filterString.toLowerCase()
        return await fetchTripAdvisorResult(tripAdvisorFetchUrl, tripAdvisorHTTPOptions, placeId, tripAdvisorKey)
    } else {
        return errorMessage
    }
}


async function getANearbyRestaurant(coordinates: Coordinates, apiKeyBundler: ApiKeyBundler,
    filtersObject: FiltersObject): Promise<TripAdvisorRestaurant | YelpRestaurant | ErrorMessage> {


    if (coordinates.latitude == 0 || coordinates.longitude == 0) {
        return errorMessage
    }

    const { yelpKey, tripAdvisorKey } = apiKeyBundler


    //Order of priority goes: Prices Option Enabled -> nextApiType.
    //This is because TripAdvisor does not always provide a price rating
    const { prices } = filtersObject

    if (prices.length > 0 || nextApiType == "yelp") {

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
    else if (nextApiType == "tripadvisor") {
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
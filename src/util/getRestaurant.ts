import {
    baseYelpURL, baseTripAdvisorURL, baseTomTomURL,
    acceptedFoodTypes, maxRadiusMeters, tomTomFilterToCategoryMap,
    unitedStatesLatitudeMin, unitedStatesLatitudeMax, unitedStatesLongitudeMin,
    unitedStatesLongitudeMax, errorMessage
} from "./constants"
import { ApiKeyBundler, YelpRestaurant, Coordinates, FiltersObject, PriceRanges, TripAdvisorRestaurant } from "./restaurantTypes"

let tomTomCache: [] = []
let tripAdvisorCache: string[] = []



//Variable to help cycle through API's. If for some reason a user gets through
//all results of one API then the another API will be used
let nextApiType = "yelp"


let yelpCache: YelpRestaurant[] = []
let prevYelpFilters = {
    isEmpty: true,
    prevPricesString: "",
    prevFoodTypesString: ""
}

// e.g. [$,$$,$$$$] -> 1,2,4
function mapPricesToNumberString(priceArr: PriceRanges[]) {
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
    if (prevYelpFilters.isEmpty && (filtersObject.prices.length > 0 || filtersObject.foodTypes.length > 0)) {
        return false
    }

    let prevPricesString = prevYelpFilters.prevPricesString
    let prevFoodTypesString = prevYelpFilters.prevFoodTypesString
    let currentPricesString = mapPricesToNumberString(filtersObject.prices)
    let currentFoodTypesString = filtersObject.foodTypes.join(",").toLowerCase()

    if (currentPricesString.includes(prevPricesString) && currentFoodTypesString.includes(prevFoodTypesString)) {
        return true
    }
    return false
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
            "Authorization": `Bearer ${yelpKey}`,
            cache: "no-store"
        }
    }
    const foodTypesArray = filtersObject.foodTypes
    const pricesArray = filtersObject.prices


    //setup categories for yelp URL
    let filterString = ""
    if (foodTypesArray) {

        //Yelp requires the category string to be of the form: Food1,Food2,...FoodN
        filterString = foodTypesArray.join(",").toLowerCase()
    }

    //Example of a yelp price string: 1,2,4
    let pricesString = mapPricesToNumberString(pricesArray)

    const { latitude, longitude } = coordinates

    const yelpFetchUrl = baseYelpURL +
        `&radius=${maxRadiusMeters}&open_now=true` +
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
            let yelpRestaurant: YelpRestaurant = {
                name: business.name,
                restaurantImageUrl: business.image_url,
                rating: business.rating,
                phoneNumber: business.phone,
                price: business.price,
                address,
                apiRespOrigin: "yelp",
                yelpWebsiteUrl: business.url,
                reviewCount: business.review_count,
                categories: business.categories
            }
            yelpCache.push(yelpRestaurant)
        }
    })
    if (yelpCache.length > 0) {

        //Although this may seem redundant the 'else' is accounting for the scenario where we have re-entered this function 
        //due to the user having filters AND the next api type was tripadvisor 
        if (yelpCache.length - 1 == 0) {
            nextApiType = "tripadvisor"
        } else {
            nextApiType = "yelp"
        }

        const newIsEmpty = (filterString == "" && pricesString == "")

        prevYelpFilters = {
            isEmpty: newIsEmpty,
            prevFoodTypesString: filterString,
            prevPricesString: pricesString
        }

        return yelpCache.pop()
    } else {
        return errorMessage
    }
}

//Since we can only get valuable information from making a seperate API call, I just made
//this util function to handle the API request
async function fetchTripAdvisorResult(tripAdvisorFetchUrl: string, tripAdvisorHTTPOptions: any) {
    const singleTaItemResp = await fetch(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    const singleTaItemRespJSON = await singleTaItemResp.json()

    let tripAdvisorRestaurant: TripAdvisorRestaurant = {
        name: singleTaItemRespJSON.name,
        address: singleTaItemRespJSON.address_obj?.address_string,
        tripAdvisorUrl: singleTaItemRespJSON.website,
        rating: singleTaItemRespJSON.rating,
        phoneNumber: singleTaItemRespJSON.phone,
        apiRespOrigin: "tripadvisor",
        ratingImageUrl: singleTaItemRespJSON.rating_image_url,
        reviewCount: singleTaItemRespJSON.num_reviews,
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

    if (tripAdvisorCache.length > 0) {
        if (tripAdvisorCache.length - 1 == 0) {
            nextApiType = "yelp"
        }
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/${tripAdvisorCache.pop()}/details?key=${tripAdvisorKey}`

        return fetchTripAdvisorResult(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    }


    const { latitude, longitude } = coordinates
    const foodTypesArray = filtersObject.foodTypes
    let tripAdvisorResp;

    //If filters are present perform a filter search
    if (foodTypesArray.length > 0) {
        let filterString = ""
        filterString = foodTypesArray.join(",")
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/search?key=${tripAdvisorKey}` +
            `&radius=${maxRadiusMeters}&radiusUnit=mi` +
            `&category=restaurants` +
            `&latLong=${latitude},${longitude}` +
            `&searchQuery=${filterString}`

        tripAdvisorResp = await fetch(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    } else {
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/nearby_search?key=${tripAdvisorKey}` +
            `&radius=${maxRadiusMeters}&radiusUnit=mi` +
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
        const tripAdvisorFetchUrl = baseTripAdvisorURL +
            `/${tripAdvisorCache.pop()}/details?key=${tripAdvisorKey}`

        if (tripAdvisorCache.length == 0) {
            nextApiType = "yelp"
        }
        return await fetchTripAdvisorResult(tripAdvisorFetchUrl, tripAdvisorHTTPOptions)
    } else {
        return errorMessage
    }

}

// async function getTomTomNearby(coordinates: Coordinates, tomTomKey: string, filtersObject: FiltersObject) {
//     if (tomTomCache.length > 0) {
//         return tomTomCache.pop()
//     }

//     const tomTomHTTPOptions = {
//         method: "GET",
//         headers: {
//             "Accept": "application/json"
//         }
//     }
//     const { latitude, longitude } = coordinates

//     //tomtom takes certain category codes to obtain more specific restaurant types
//     const categoryStringArray = []
//     const foodTypes = filtersObject.foodTypes
//     const foodTypesLength = foodTypes.length ?? 0

//     for (let i = 0; i < foodTypesLength; i++) {
//         let mapRes = tomTomFilterToCategoryMap.get(foodTypes[i].toLowerCase())
//         if (mapRes) {
//             categoryStringArray.push(mapRes)
//         }
//     }

//     const tomTomFetchUrl = baseTomTomURL +
//         `/nearbySearch/.json?key=${tomTomKey}&openingHours=nextSevenDays` +
//         `&categorySet=${categoryStringArray.length > 0 ? categoryStringArray.join(",") : "7315"}` +
//         `&radius=${maxRadiusMeters}` +
//         `&lat=${latitude}&lon=${longitude}&limit=15`

//     const tomTomResp = await fetch(tomTomFetchUrl, tomTomHTTPOptions)
//     const tomTomRespJSON = await tomTomResp.json()
//     if (!tomTomRespJSON.results) {
//         return errorMessage
//     }

//     const results = tomTomRespJSON.results
//     const resultsLength = results.length ?? 0
//     for (let i = 0; i < resultsLength; i++) {
//         let business = results[i]
//         let businessPoi = business?.poi
//         tomTomCache.push({
//             apiRespOrigin: "tomtom",
//             name: businessPoi.name,
//             phoneNumber: businessPoi.phone,
//             websiteLink: businessPoi.url,
//             address: business.address.freeformAddress
//         })
//     }

//     //Once again, only return results if we actually found matching businesses
//     if (tomTomCache.length > 0) {
//         return tomTomCache.pop()
//     } else {
//         return errorMessage
//     }
// }

function isCoordsInUnitedState(coordinates: Coordinates) {
    const { latitude, longitude } = coordinates
    if (latitude > unitedStatesLatitudeMin
        && latitude < unitedStatesLatitudeMax
        && longitude > unitedStatesLongitudeMin
        && longitude < unitedStatesLongitudeMax) {
        return true
    }
    return false

}



async function getANearbyRestaurant(coordinates: Coordinates, apiKeyBundler: ApiKeyBundler,
    filtersObject: FiltersObject) {


    if (coordinates.latitude == 0 || coordinates.longitude == 0) {
        return errorMessage
    }

    const { yelpKey, tomTomKey, tripAdvisorKey } = apiKeyBundler


    const isInUS: boolean = isCoordsInUnitedState(coordinates)

    // //Yelp is US centric so prioritize TomTom API first
    // if (!isInUS) {
    //     if (!tomTomKey) {
    //         return
    //     }
    //     const result = await getTomTomNearby(coordinates, tomTomKey, filtersObject)

    //     //fall through to other API's if TomTom fails
    //     if (result && !("errorMessage" in result)) {
    //         return result
    //     }
    // }

    //Order of priority goes: Prices Option Enabled -> nextApiType.
    //This is because TripAdvisor does not always provide a price rating
    const { prices } = filtersObject

    if (prices.length > 0 || nextApiType == "yelp") {
        if (yelpKey) {
            const result = await getYelpNearby(coordinates, yelpKey, filtersObject)
            if (result && !("errorMessage" in result)) {
                return result
            }
        }

        //if yelp API fails then fall through to TA
        if (tripAdvisorKey) {
            const result = await getTripAdvisorNearby(coordinates, tripAdvisorKey, filtersObject)
            if (result && !("errorMessage" in result)) {
                return result
            }
        }
        return errorMessage
    }
    else if (nextApiType == "tripadvisor") {
        if (tripAdvisorKey) {
            const result = await getTripAdvisorNearby(coordinates, tripAdvisorKey, filtersObject)
            if (result && !("errorMessage" in result)) {
                return result
            }
        }

        if (yelpKey) {
            const result = await getYelpNearby(coordinates, yelpKey, filtersObject)
            if (result && !("errorMessage" in result)) {
                return result
            }
        }
        return errorMessage
    }


    return errorMessage
}

export default getANearbyRestaurant
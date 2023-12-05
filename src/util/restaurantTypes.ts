
export type AcceptedFoodFilters = "Sandwiches" | "Breakfast" | "Sushi" | "Burgers" | "Pizza" | "Chinese" | "Mexican"

export type PossibleApis = "yelp" | "tripadvisor" | undefined

export type PossiblePrices = "$" | "$$" | "$$$" | "$$$$"


export interface ICuisine {
    name: string,
    localized_name: string
}
export type ApiKeyBundler = {
    yelpKey?: string,
    tripAdvisorKey?: string
    tomTomKey?: string
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface ApiError {
    errorMessage: string
}

export interface GenericRestaurant {
    name?: string
    phoneNumber?: string
    address?: string,
    restaurantImageUrl?: string
    latitudeAndLongitude?: string
}

//This type is so BAD. However I can't find a fix around this for some reason.
// Need to fix this hack cuz it hurts my eyes
export interface TripAdvisorRestaurant extends GenericRestaurant {
    taType: "tripadvisor"
    ratingImageUrl?: string
    price?: string
    tripAdvisorUrl?: string
    hours?: string[]
    rating?: string
    reviewCount?: string
    cuisine?: ICuisine[]
}

export interface YelpRestaurant extends GenericRestaurant {
    yelpType: "yelp"
    yelpWebsiteUrl?: string
    categories?: any[]
    distance?: number
    rating?: number
    reviewCount?: number
    price?: PossiblePrices
}

export interface ErrorMessage {
    errorMessage: string
}
export interface FiltersObject {
    prices: PossiblePrices[]
    foodTypes: AcceptedFoodFilters[]
}



export type AcceptedFoodFilters =
    "Sandwiches" | "Breakfast" | "Sushi" | "Burgers" | "Mediterranean"
    | "Pizza" | "Chinese" | "Mexican" | "Steak" | "Seafood" | "Thai" | "Japanese"

export type PossibleApis = "yelp" | "tripadvisor" | undefined
export type PossibleApisStrict = "yelp" | "tripadvisor"

export type PossiblePrices = "$" | "$$" | "$$$" | "$$$$"
export type FilterDistance = string

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



export interface GenericRestaurant {
    id: string | number
    apiRespOrigin: PossibleApisStrict
    name?: string
    phoneNumber?: string
    address?: string,
    restaurantImageUrl?: string
    latitudeAndLongitude?: string
}

export interface TripAdvisorRestaurant extends GenericRestaurant {
    ratingImageUrl?: string
    price?: string
    tripAdvisorUrl?: string
    hours?: string[]
    rating?: string
    reviewCount?: string
    cuisine?: ICuisine[]
}

export interface YelpRestaurant extends GenericRestaurant {
    yelpWebsiteUrl?: string
    categories?: any[]
    distance?: number
    rating?: number
    reviewCount?: number
    price?: PossiblePrices
}

export interface ErrorMessage {
    apiRespOrigin: "error"
    error: string
}
export interface FiltersObject {
    prices: PossiblePrices[]
    cuisines: AcceptedFoodFilters[]
    filterDistance: FilterDistance
}


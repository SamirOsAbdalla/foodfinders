
export type AcceptedFoodFilters = "Sandwiches" | "Burgers" | "Pizza" | "Chinese" | "Mexican"

export type PossibleApis = "yelp" | "tripadvisor" | undefined

export type PriceRanges = "$" | "$$" | "$$$" | "$$$$"

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
    apiRespOrigin: PossibleApis
    name?: string
    phoneNumber?: string
    address?: string,
    price?: PriceRanges
    restaurantImageUrl?: string
    latitudeAndLongitude?: string
}

export interface TripAdvisorRestaurant extends GenericRestaurant {
    ratingImageUrl?: string
    tripAdvisorUrl?: string
    hours?: string[]
    rating?: string
    reviewCount?: string
}

export interface YelpRestaurant extends GenericRestaurant {
    yelpWebsiteUrl?: string
    categories?: any[]
    distance?: string
    rating?: number
    reviewCount?: number
}

export interface FiltersObject {
    prices: PriceRanges[]
    foodTypes: AcceptedFoodFilters[]
}
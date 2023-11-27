
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
    rating?: number
    phoneNumber?: string
    address?: string,
    reviewCount?: number
    price?: PriceRanges
}

export interface TripAdvisorRestaurant extends GenericRestaurant {
    ratingImageUrl?: string
    tripAdvisorUrl?: string
    hours?: string[]
}

export interface YelpRestaurant extends GenericRestaurant {
    restaurantImageUrl?: string
    yelpWebsiteUrl?: string
    categories?: any[]
    distance?: string
}

export interface FiltersObject {
    prices: PriceRanges[]
    foodTypes: AcceptedFoodFilters[]
}

export type AcceptedFoodFilters = "Sandwiches" | "Burgers" | "Pizza" | "Chinese" | "Mexican"

type PossibleApis = "yelp" | "tomtom" | "tripadvisor"

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
    price?: PriceRanges
    reviewCount?: number
}

export interface TripAdvisorRestaurant extends GenericRestaurant {
    ratingImageUrl?: string
    tripAdvisorUrl?: string
}

export interface YelpRestaurant extends GenericRestaurant {
    restaurantImageUrl?: string
    yelpWebsiteUrl?: string
    categories?: any[]
}

export interface FiltersObject {
    prices: PriceRanges[]
    foodTypes: AcceptedFoodFilters[]
}
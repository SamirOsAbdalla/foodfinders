import { ErrorMessage } from "./restaurantTypes"

const baseYelpURL = `https://api.yelp.com/v3/businesses/search?sort_by=best_match&term=food`
const baseTripAdvisorURL = `https://api.content.tripadvisor.com/api/v1/location`



const maxRadiusMeters = 15312
const metersToMiles = .00062137
const unitedStatesLatitudeMin = 24.396308
const unitedStatesLatitudeMax = 49.384358
const unitedStatesLongitudeMin = -125.000000
const unitedStatesLongitudeMax = -66.934570
const errorMessage: ErrorMessage = {
    errorMessage: "Error: Could not find nearby restaurants with these filters."
}

export {
    baseYelpURL,
    baseTripAdvisorURL,
    maxRadiusMeters,
    unitedStatesLatitudeMin,
    unitedStatesLatitudeMax,
    unitedStatesLongitudeMin,
    unitedStatesLongitudeMax,
    errorMessage,
    metersToMiles
}

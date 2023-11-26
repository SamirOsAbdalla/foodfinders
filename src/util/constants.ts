const baseYelpURL = `https://api.yelp.com/v3/businesses/search?sort_by=best_match&term=food`
const baseTripAdvisorURL = `https://api.content.tripadvisor.com/api/v1/location`
const baseTomTomURL = `https://api.tomtom.com/search/2/`

const acceptedFoodTypes = ["sandwiches", "burgers", "pizza", "chinese", "mexican"]

//about 12 miles
const maxRadiusMeters = 19312
const unitedStatesLatitudeMin = 24.396308
const unitedStatesLatitudeMax = 49.384358
const unitedStatesLongitudeMin = -125.000000
const unitedStatesLongitudeMax = -66.934570
const errorMessage = {
    errorMessage: "Error: Could not find nearby restaurants with these filters."
}

const tomTomFilterToCategoryMap = new Map();
//initialize map to fetch category set codes for TomTom API easier
acceptedFoodTypes.forEach(filter => {
    switch (filter) {
        case ("sandwiches"):
            tomTomFilterToCategoryMap.set("sandwiches", 7315042)
            break;
        case ("burgers"):
            tomTomFilterToCategoryMap.set("burgers", 7315069)
            break;
        case ("pizza"):
            tomTomFilterToCategoryMap.set("pizza", 7315036)
            break;
        case ("chinese"):
            tomTomFilterToCategoryMap.set("chinese", 7315012)
            break;
        case ("mexican"):
            tomTomFilterToCategoryMap.set("mexican", 7315033)
            break
        default:
            break

    }
})

export {
    baseYelpURL, baseTripAdvisorURL, baseTomTomURL,
    acceptedFoodTypes, maxRadiusMeters, tomTomFilterToCategoryMap, unitedStatesLatitudeMin,
    unitedStatesLatitudeMax, unitedStatesLongitudeMin, unitedStatesLongitudeMax,
    errorMessage
}

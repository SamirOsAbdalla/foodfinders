import React from 'react'
import { PossibleApisStrict } from '@/util/restaurantTypes'
interface Props{
    apiRespOrigin : PossibleApisStrict
}
export default function RatingOrigin({
    apiRespOrigin
} : Props) {
    
    return (
        <div>
            {(apiRespOrigin == "yelp") &&
                <span>Yelp</span>
            }
            {(apiRespOrigin == "tripadvisor") &&
                <span>TripAdvisor</span>
            }
        </div>
    )
}

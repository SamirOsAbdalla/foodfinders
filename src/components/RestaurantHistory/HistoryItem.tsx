import React from 'react'
import Rating from './Rating';
import RatingOrigin from './RatingOrigin';
import { PossibleApisStrict } from '@/util/restaurantTypes';
import { YelpRestaurant, TripAdvisorRestaurant } from '@/util/restaurantTypes';

interface Props {
    name?: string,
    rating?: number | string,
    reviewCount?: number | string,
    apiRespOrigin: PossibleApisStrict,
    clickHandler: () => void
}
export default function HistoryItem({
    name,
    rating,
    reviewCount,
    apiRespOrigin,
    clickHandler
}: Props) {
    return (
        <div onClick={clickHandler} className="rh__item d-flex flex-column gap-2">
            <span className="rh__name">{name}</span>
            <div className="rh__bottom__text d-flex align-items-center justify-content-between">
                <Rating
                    rating={rating}
                    reviewCount={reviewCount}
                />
                <RatingOrigin
                    apiRespOrigin={apiRespOrigin}
                />
            </div>
        </div>
    )
}

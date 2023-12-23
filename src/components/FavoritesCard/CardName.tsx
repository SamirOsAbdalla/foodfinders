import React from 'react'
import CardOptions from './CardOptions'
import { TripAdvisorRestaurant, YelpRestaurant } from '@/util/restaurantTypes'

interface Props {
    name: string
    restaurant: YelpRestaurant | TripAdvisorRestaurant
}

export default function CardName({
    name,
    restaurant
}: Props) {
    return (
        <div className="card-name w-100 d-flex justify-content-between gap-2 ">
            {name}
            <CardOptions restaurant={restaurant} />
        </div>
    )
}

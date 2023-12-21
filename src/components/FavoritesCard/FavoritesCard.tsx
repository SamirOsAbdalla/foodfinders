import React from 'react'
import {
    TripAdvisorRestaurant,
    YelpRestaurant
} from '@/util/restaurantTypes'
import "./FavoritesCard.css"
import CardImage from './CardImage'
import CardName from './CardName'
import CardCategories from './CardCategories'
import YelpUtilButtons from '../Yelp/YelpUtilButtons/YelpUtilButtons'
import OriginAttribution from './OriginAttribution'

interface Props {
    restaurant: YelpRestaurant | TripAdvisorRestaurant
}

export default function FavoritesCard({ restaurant }: Props) {

    const {
        apiRespOrigin,
        name
    } = restaurant

    if (apiRespOrigin == "yelp") {
        restaurant = restaurant as YelpRestaurant
        return (
            <div className="favorites-card__wrapper d-flex flex-column gap-3">
                <CardImage imageUrl={restaurant.restaurantImageUrl} apiRespOrigin={apiRespOrigin} />

                <div className="favorites-card__bottom d-flex flex-column gap-3">
                    <CardCategories categories={restaurant.categories} />
                    <CardName name={name ?? "Restaurant"} />
                    <YelpUtilButtons phoneNumber={restaurant.phoneNumber} address={restaurant.address} origin="card" />
                    <OriginAttribution apiRespOrigin={apiRespOrigin} />
                </div>
            </div>
        )
    }
    restaurant = restaurant as TripAdvisorRestaurant
    return (
        <div className="favorites-card__wrapper d-flex flex-column gap-3">
            <CardImage imageUrl={restaurant.restaurantImageUrl} apiRespOrigin={apiRespOrigin} />

            <div className="favorites-card__bottom d-flex flex-column gap-3">
                <CardName name={name ?? "Restaurant"} />
                <YelpUtilButtons phoneNumber={restaurant.phoneNumber} address={restaurant.address} origin="card" />
                <OriginAttribution apiRespOrigin={apiRespOrigin} />
            </div>
        </div>
    )

}

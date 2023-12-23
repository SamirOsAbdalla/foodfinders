import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentRestaurant } from '@/redux/slices/currentRestaurant-slice';
import { AppDispatch } from '@/redux/store';
import { TripAdvisorRestaurant, YelpRestaurant } from '@/util/restaurantTypes';
import { useRouter } from 'next/navigation';
import { removeFavoriteFromMongo } from '../FavoritesButton/FavoritesButton';
import { useSession } from 'next-auth/react';
import { removeFavorite } from '@/redux/slices/favorites-slice';
interface Props {
    restaurant: YelpRestaurant | TripAdvisorRestaurant

}
export default function CardOptions({
    restaurant
}: Props) {

    const [dropdownStatus, setDropdownStatus] = useState<"open" | "closed">("closed")
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { data: session } = useSession()

    const toggleDropdownStatus = () => {
        dropdownStatus == "open" ? setDropdownStatus("closed") : setDropdownStatus("open")
    }

    const handleRemoveFavorite = () => {
        const email = session?.user?.email

        removeFavoriteFromMongo(email, restaurant.id)
        dispatch(removeFavorite(restaurant.id))
    }

    const setFullView = () => {
        dispatch(setCurrentRestaurant({ currentRestaurant: restaurant }))
        router.replace("/")
    }
    return (
        <div className="card-options__wrapper position-relative">
            <BsThreeDotsVertical onClick={() => toggleDropdownStatus()} className="three-dots" />
            {dropdownStatus == "open" &&
                <div className="position-absolute options__container d-flex flex-column gap-2">
                    <div className="card-option__option" onClick={handleRemoveFavorite}> Remove favorite</div>
                    <div className="card-option__option" onClick={setFullView}>Full view</div>
                </div>
            }
        </div>
    )
}

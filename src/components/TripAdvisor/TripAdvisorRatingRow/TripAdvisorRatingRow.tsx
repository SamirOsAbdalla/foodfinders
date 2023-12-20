import FavoritesButton from "@/components/FavoritesButton/FavoritesButton"
import "./TripAdvisorRatingRow.css"
import Image from "next/image"
import TripAdvisorCuisines from "../TripAdvisorCuisines/TripAdvisorCuisines"
import { ICuisine, TripAdvisorRestaurant } from "@/util/restaurantTypes"

interface Props {
    restaurant: TripAdvisorRestaurant
}

export default function TripAdvisorRatingRow({ restaurant }: Props) {

    const { price, rating, reviewCount, cuisine, ratingImageUrl } = restaurant

    return (
        <div className="ta__ratingrow__wrapper w-100 d-flex justify-content-between align-items-center gap-3">
            {(!price && !rating && (!reviewCount || parseInt(reviewCount) == 0)) ?
                <></> :
                <div className="ta__ratingrow__main d-flex justify-content-start align-items-center gap-2">
                    {price &&
                        <span className="d-flex gap-2 fw-bold">
                            {price}
                        </span>
                    }
                    {price && <span className="ta-review__dot">•</span>}
                    <TripAdvisorCuisines
                        cuisines={cuisine}
                    />
                    {ratingImageUrl &&
                        <div className="ta__rating__container position-relative">
                            <Image fill src={ratingImageUrl} alt="Rating Image" />
                        </div>
                    }
                    {rating && <span className="ta__rating fw-bold">{rating}</span>}
                    {reviewCount && <span className="ta__review__count">({reviewCount} reviews)</span>}
                </div>}

            <FavoritesButton
                buttonOrigin="tripadvisor"
                favoriteItem={restaurant}
            />
        </div>
    )
}

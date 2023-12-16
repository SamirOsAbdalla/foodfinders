import FavoritesButton from "@/components/FavoritesButton/FavoritesButton"
import "./TripAdvisorRatingRow.css"
import Image from "next/image"
import TripAdvisorCuisines from "../TripAdvisorCuisines/TripAdvisorCuisines"
import { ICuisine } from "@/util/restaurantTypes"

interface Props {
    ratingUrl?: string
    reviewCount?: string
    cuisine?: ICuisine[]
    rating?: string,
    price?: string
}

export default function TripAdvisorRatingRow({
    ratingUrl,
    reviewCount,
    cuisine,
    rating,
    price
}: Props) {

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
                    {price && <span>•</span>}
                    <TripAdvisorCuisines
                        cuisines={cuisine}
                    />
                    {ratingUrl &&
                        <div className="ta__rating__container position-relative">
                            <Image fill src={ratingUrl} alt="Rating Image" />
                        </div>
                    }
                    {rating && <span className="ta__rating fw-bold">{rating}</span>}
                    {reviewCount && <span className="ta__review__count">({reviewCount} reviews)</span>}
                </div>}

            <FavoritesButton
                buttonOrigin="tripadvisor"
            />
        </div>
    )
}



import { PossiblePrices } from "@/util/restaurantTypes"
import "./YelpReview.css"
import Image from "next/image"
import React from "react"
import FavoritesButton from "@/components/FavoritesButton/FavoritesButton"

interface Props {
    rating?: number,
    reviewCount?: number,
    price?: PossiblePrices,
    children?: React.ReactNode
    distance?: number
}

export default function YelpReview({
    rating,
    reviewCount,
    price,
    children,
    distance
}: Props) {
    const getYelpRatingImageSrc = () => {
        switch (rating) {
            case (2.5): {
                return "/regular/regular_2_half.png"
            }
            case (3): {
                return "/regular/regular_3.png"
            }
            case (3.5): {
                return "/regular/regular_3_half.png"
            }
            case (4): {
                return "/regular/regular_4.png"
            }
            case (4.5): {
                return "/regular/regular_4_half.png"
            }
            case (5): {
                return "/regular/regular_5.png"
            }
            default:
                return ""
        }
    }


    return (
        <div className="w-100 d-flex justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-1">
                {rating &&
                    <div className="d-flex align-items-center gap-2">
                        <div className="position-relative">
                            <Image width={100} height={20} src={getYelpRatingImageSrc()} alt="Yelp Rating" />
                        </div>
                        <span className="yelp-rating__text">{rating}</span>
                    </div>
                }
                {reviewCount && <span className="yelp-reviewcount__text__dot">•</span>}
                {reviewCount &&
                    <span className="yelp-reviewcount__text">
                        {`${reviewCount} reviews`}
                    </span>
                }
                {price && <span>•</span>}
                {price &&
                    <div className="d-flex justify-content-center align-items-center">
                        {price}
                    </div>
                }
                <span>•</span>
                {distance && <div>{distance.toFixed(2)} mi</div>}
            </div>
            <FavoritesButton
                buttonOrigin="yelp"
            />
        </div>

    )
}

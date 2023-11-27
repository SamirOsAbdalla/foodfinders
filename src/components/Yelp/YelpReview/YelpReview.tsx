

import { PriceRanges } from "@/util/restaurantTypes"
import "./YelpReview.css"
import Image from "next/image"

interface Props {
    rating?: number,
    reviewCount?: number,
    price?: PriceRanges
}

export default function YelpReview({
    rating,
    reviewCount,
    price
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
        <div className="w-100 d-flex align-items-center gap-1">
            {rating &&
                <div className="d-flex align-items-center gap-2">
                    <div className="position-relative">
                        <Image width={100} height={20} src={getYelpRatingImageSrc()} alt="Yelp Rating" />
                    </div>
                    <span className="yelp__rating__text">{rating}</span>
                </div>
            }
            {reviewCount && <span>•</span>}
            {reviewCount &&
                <span className="yelp__reviewcount__text">
                    {`${reviewCount} reviews`}
                </span>
            }
            {price && <span>•</span>}
            {price &&
                <div className="d-flex justify-content-center align-items-center">
                    {price}
                </div>
            }
        </div>
    )
}

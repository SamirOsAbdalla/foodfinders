import React from 'react'
import { TiStarFullOutline } from 'react-icons/ti'

interface Props {
    rating?: number | string,
    reviewCount?: number | string
}
export default function Rating({
    rating,
    reviewCount
}: Props) {
    return (
        <div className="d-flex align-items-center justify-content-start gap-1">
            <div className="d-flex align-items-center justify-content-start gap-1">
                {rating}
                <TiStarFullOutline />
            </div>
            {reviewCount &&
                <div>
                    {reviewCount} reviews
                </div>
            }
        </div>
    )
}

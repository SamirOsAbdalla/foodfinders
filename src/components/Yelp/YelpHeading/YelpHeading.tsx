import React from 'react'
import "./YelpHeading.css"
interface Props {
    name?: string
    children?: React.ReactNode
}
export default function YelpHeading({
    name,
    children
}: Props) {



    return (
        <div className="w-100 d-flex justify-content-between align-items-center flex-wrap gap-2">
            {name &&
                <div className="yelp__heading d-flex justify-content-start align-items-end">
                    {name}
                </div>
            }
            {children}
        </div>
    )
}

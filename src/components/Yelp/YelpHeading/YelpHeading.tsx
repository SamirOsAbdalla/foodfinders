import React from 'react'
import "./YelpHeading.css"
interface Props {
    name?: string
    categories?: any[]
}
export default function YelpHeading({
    name,
    categories
}: Props) {


    const getCategoryButtons = (categories: any[]) => {
        return (
            <div className="d-flex gap-3 justify-content-start align-items-center">
                {categories.map((category: any, index) => {
                    if (index >= 3) {
                        return (<></>)
                    } else {
                        return (
                            <div key={category.alias} className={`yelp__button__white fs-14 d-flex justify-content-center`}>
                                <span>{category.title}</span>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    return (
        <div className="w-100 flex-wrap pt-4 d-flex justify-content-between align-items-center gap-2">
            {name &&
                <div className="yelp__heading d-flex justify-content-start">
                    {name}
                </div>
            }
            {categories && categories.length > 0 &&
                <div className="yelp__category__buttons d-flex align-items-center">
                    {getCategoryButtons(categories)}
                </div>
            }

        </div>
    )
}

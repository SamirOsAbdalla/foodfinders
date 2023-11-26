"use client"
import React from 'react'
import "./RestaurantDisplay.css"
import Image from 'next/image'
import { YelpRestaurant } from '@/util/restaurantTypes'
import Link from 'next/link'
import { IoCallOutline } from "react-icons/io5";
import { FaMapMarkedAlt } from "react-icons/fa";



export default function RestaurantDisplay({ name,
    rating, phoneNumber, price, address, apiRespOrigin,
    yelpWebsiteUrl, restaurantImageUrl, categories, reviewCount
}: YelpRestaurant) {


    const getCategoryButtons = (categories: any[]) => {

        return (
            <div className="d-flex gap-3 justify-content-start align-items-center">
                {categories.map((category: any, index) => {
                    if (index >= 3) {
                        return (<></>)
                    } else {
                        return (
                            <div key={category.alias} className={`d-flex justify-content-center rd__category rd__category__${index}`}>
                                {category.title}
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

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
        <section className="rd__wrapper d-flex flex-column align-items-around justify-content-start">
            {restaurantImageUrl &&
                <div className="position-relative">
                    <div className="w-100 rd__restaurant__image position-relative">
                        <Image fill style={{ objectFit: "cover" }} src={restaurantImageUrl} alt="Restaurant Image" />
                    </div>
                    <a href={yelpWebsiteUrl} target="_blank" className="rd__website__link d-flex justify-content-center align-items-center position-absolute">
                        <Image src="/yelp_logo.svg" alt="Yelp Logo" width={70} height={25} />
                    </a>
                </div>

            }
            <div className="rd__heading d-flex align-items-center w-100 justify-content-between">
                {name &&
                    <div className="fw-bold d-flex justify-content-start">
                        {name}
                    </div>
                }
                {price &&
                    <div className="rd__price  d-flex justify-content-center align-items-center">
                        {price}
                    </div>
                }
            </div>
            <div className="d-flex flex-column w-100 gap-4">
                <div className="w-100 d-flex justify-content-between align-items-center">
                    {categories && categories.length > 0 &&
                        <div className="d-flex align-items-center gap-3">
                            {getCategoryButtons(categories)}
                        </div>
                    }
                    {rating &&

                        <div className="d-flex gap-2">
                            <div className="position-relative">
                                <Image width={100} height={20} src={getYelpRatingImageSrc()} alt="Yelp Rating" />
                            </div>
                            <span className="rating__text fw-bold">{rating}</span>
                            {reviewCount &&
                                <span className="reviewcount__text">
                                    {`(${reviewCount} reviews)`}
                                </span>
                            }
                        </div>

                    }
                </div>
                <div className="d-flex pt-5 gap-5 w-100 align-items-center justify-content-center">
                    {phoneNumber &&
                        <Link className="text-decoration-none rd__button d-flex justify-content-center align-items-center" href={`tel:${phoneNumber}`}>
                            <IoCallOutline className="phone__icon" />
                        </Link>
                    }
                    {address && <button className="rd__button"><FaMapMarkedAlt />
                    </button>}
                </div>
            </div>
        </section>


    )
}

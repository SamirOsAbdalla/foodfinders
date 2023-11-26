"use client"
import React from 'react'
import "./RestaurantDisplay.css"
import Image from 'next/image'
import { YelpRestaurant } from '@/util/restaurantTypes'
import Link from 'next/link'
import { IoCallOutline } from "react-icons/io5";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaRegClock, FaHeart } from "react-icons/fa6";
import RestaurantHistory from '../RestaurantHistory/RestaurantHistory'


const metersToMilesFactor = 0.000621371
export default function RestaurantDisplay({ name,
    rating, phoneNumber, price, address, apiRespOrigin,
    yelpWebsiteUrl, restaurantImageUrl, categories, reviewCount,
    distance
}: YelpRestaurant) {


    const getCategoryButtons = (categories: any[]) => {

        return (
            <div className="d-flex gap-3 justify-content-start align-items-center">
                {categories.map((category: any, index) => {
                    if (index >= 3) {
                        return (<></>)
                    } else {
                        return (
                            <div key={category.alias} className={`rd__button__white rd__category d-flex justify-content-center`}>
                                <span>{category.title}</span>
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
        <section className="w-100 rd__section d-flex">
            <div className="rd__wrapper d-flex flex-column align-items-around">
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
                <div className="d-flex flex-column gap-3">
                    <div className="w-100 pt-4 d-flex justify-content-between align-items-center">
                        {name &&
                            <div className="rd__heading d-flex justify-content-start">
                                {name}
                            </div>
                        }
                        {categories && categories.length > 0 &&
                            <div className="d-flex align-items-center">
                                {getCategoryButtons(categories)}
                            </div>
                        }
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        {rating &&
                            <div className="d-flex align-items-center gap-2">
                                <div className="position-relative">
                                    <Image width={100} height={20} src={getYelpRatingImageSrc()} alt="Yelp Rating" />
                                </div>
                                <span className="rating__text fw-bold">{rating}</span>
                            </div>
                        }
                        {reviewCount && <span>•</span>}
                        {reviewCount &&
                            <span className="reviewcount__text">
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
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center gap-2">
                            <div className="clock__container d-flex justify-content-start align-items-center gap-1">
                                <FaRegClock className="rd__clock" />
                                <span>Open Now</span>
                            </div>
                            <span>•</span>
                            {distance &&
                                <div className="rd__miles">
                                    {(parseFloat(distance) * metersToMilesFactor).toFixed(1)} mi
                                </div>
                            }
                        </div>
                        <button className="rd_button_red">
                            <FaHeart />
                            Add To Favorites
                        </button>
                    </div>
                    <div className="d-flex w-100 justify-content-start align-items-center gap-2">
                        {phoneNumber &&
                            <Link className="text-decoration-none rd__button d-flex justify-content-center align-items-center" href={`tel:${phoneNumber}`}>
                                <IoCallOutline className="phone__icon" />
                                Call
                            </Link>
                        }
                        {address &&
                            <button className="rd__button">
                                <FaMapMarkedAlt />
                                Navigate
                            </button>
                        }
                    </div>

                </div>
            </div>
            <RestaurantHistory />
        </section>
    )
}

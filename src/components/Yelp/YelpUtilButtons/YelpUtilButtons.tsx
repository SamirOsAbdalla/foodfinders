import "./YelpUtilButtons.css"
import Link from "next/link"
import { FaMapMarkedAlt } from "react-icons/fa"
import { IoCallOutline } from "react-icons/io5"
import { useState } from "react"


export const useLocation = () => {

    let [latitude, setLatitude] = useState<number>(0)
    let [longitude, setLongitude] = useState<number>(0)

    const geolocationSuccess = (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }

    const geolocationError = () => {

    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError)
    }
    return { latitude, longitude }
}

interface Props {
    phoneNumber?: string,
    address?: string,
    origin?: string
}
export default function YelpUtilButtons(
    {
        phoneNumber,
        address,
        origin
    }: Props) {


    let {
        latitude,
        longitude
    } = useLocation()

    return (
        <div className="yelp-util-buttons__wrapper d-flex justify-content-start align-items-center gap-2">
            {phoneNumber &&
                <Link className={`text-decoration-none yelp-util__button yelp-util__button--call ${origin && "card__origin"} d-flex justify-content-center align-items-center`} href={`tel:${phoneNumber}`}>
                    <IoCallOutline className="yelp-phone__icon" />
                    Call
                </Link>
            }
            {address &&
                <Link href={`http://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${address}`} target="_blank" className={`text-decoration-none yelp-util__button ${origin && "card__origin"} d-flex justify-content-center align-items-center`}>
                    <FaMapMarkedAlt />
                    Navigate
                </Link>
            }
        </div>
    )
}

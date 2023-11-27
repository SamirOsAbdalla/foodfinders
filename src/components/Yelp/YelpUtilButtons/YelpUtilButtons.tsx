import "./YelpUtilButtons.css"
import Link from "next/link"
import { FaMapMarkedAlt } from "react-icons/fa"
import { IoCallOutline } from "react-icons/io5"

interface Props {
    phoneNumber?: string,
    address?: string
}
export default function YelpUtilButtons(
    {
        phoneNumber,
        address
    }: Props) {
    return (
        <div className="d-flex w-100 justify-content-start align-items-center gap-2">
            {phoneNumber &&
                <Link className="text-decoration-none yelp__util__button d-flex justify-content-center align-items-center" href={`tel:${phoneNumber}`}>
                    <IoCallOutline className="yelp__phone__icon" />
                    Call
                </Link>
            }
            {address &&
                <button className="yelp__util__button">
                    <FaMapMarkedAlt />
                    Navigate
                </button>
            }
        </div>
    )
}

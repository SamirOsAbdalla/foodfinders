import "./TripAdvisorButtons.css"
import { IoCallOutline } from "react-icons/io5"
import { FaMapMarkedAlt } from "react-icons/fa"
import Link from "next/link"
// Admittedly this can be a combined component along with the Yelp buttons
// but making a generic component is a task for a later time

interface Props {
    phoneNumber?: string,
    address?: string
}
export default function TripAdvisorButtons({
    phoneNumber,
    address
}: Props) {
    return (
        <div className="d-flex justify-content-start gap-2">
            {phoneNumber &&
                <Link href={`tel:${phoneNumber}`} className="tripadvisor__button text-decoration-none tripadvisor__call">
                    <IoCallOutline className="" />
                    Call
                </Link>
            }
            {address &&
                <Link href="" className="text-decoration-none tripadvisor__button tripadvisor__navigate">
                    <FaMapMarkedAlt />
                    Navigate
                </Link>
            }

        </div>
    )
}

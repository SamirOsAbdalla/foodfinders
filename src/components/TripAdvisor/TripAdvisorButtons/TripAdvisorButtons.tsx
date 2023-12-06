import "./TripAdvisorButtons.css"
import { IoCallOutline } from "react-icons/io5"
import { FaMapMarkedAlt } from "react-icons/fa"
import Link from "next/link"
import { useLocation } from "@/components/Yelp/YelpUtilButtons/YelpUtilButtons"

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

    const {
        latitude,
        longitude
    } = useLocation()

    return (
        <div className="d-flex justify-content-start gap-2">
            {phoneNumber &&
                <Link href={`tel:${phoneNumber}`} className="tripadvisor__button text-decoration-none tripadvisor__call">
                    <IoCallOutline className="" />
                    Call
                </Link>
            }
            {address &&
                <Link href={`http://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${address}`} className="text-decoration-none tripadvisor__button tripadvisor__navigate">
                    <FaMapMarkedAlt />
                    Navigate
                </Link>
            }

        </div>
    )
}

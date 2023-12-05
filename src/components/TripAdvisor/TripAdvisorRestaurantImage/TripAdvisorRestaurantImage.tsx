import "./TripAdvisorRestaurantImage.css"
import Image from "next/image"
import { FaRegHeart } from "react-icons/fa";

interface Props {
    restaurantImageUrl?: string
}


export default function TripAdvisorRestaurantImage({
    restaurantImageUrl
}: Props) {
    return (
        <div>
            <div className={`w-100 ta__restaurantimage__container ${restaurantImageUrl ? "" : "background__black"} position-relative`}>
                {restaurantImageUrl ?
                    <Image
                        fill
                        src={`${restaurantImageUrl}`}
                        style={{ objectFit: "cover" }}
                        alt="TripAdvisor Image"
                    /> :
                    <Image
                        fill
                        src="/tripadvisor_logo.png"
                        style={{ objectFit: "contain" }}
                        alt="TripAdvisor Image"
                    />
                }
            </div>
        </div>

    )
}

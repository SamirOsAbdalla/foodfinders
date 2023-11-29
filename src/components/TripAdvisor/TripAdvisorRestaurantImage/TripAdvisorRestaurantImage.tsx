import "./TripAdvisorRestaurantImage.css"
import Image from "next/image"
interface Props {
    restaurantImageUrl?: string
}


export default function TripAdvisorRestaurantImage({
    restaurantImageUrl
}: Props) {
    return (
        <div className="w-100 ta__restaurantimage__container position-relative">
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
    )
}

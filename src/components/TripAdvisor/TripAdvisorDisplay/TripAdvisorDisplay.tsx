import { TripAdvisorRestaurant } from "@/util/restaurantTypes"
import "./TripAdvisorDisplay.css"
import RestaurantHistory from "@/components/RestaurantHistory/RestaurantHistory"
import TripAdvisorRestaurantImage from "../TripAdvisorRestaurantImage/TripAdvisorRestaurantImage"


export default function TripAdvisorDisplay({
    apiRespOrigin,
    name,
    phoneNumber,
    address,
    price,
    restaurantImageUrl,
    ratingImageUrl,
    tripAdvisorUrl,
    hours,
    rating,
    reviewCount
}: TripAdvisorRestaurant) {
    return (
        <section className="tadisplay__wrapper d-flex">
            <div className="tadisplay__main">
                <TripAdvisorRestaurantImage
                    restaurantImageUrl={restaurantImageUrl}
                />
            </div>
            <RestaurantHistory />
        </section>
    )
}

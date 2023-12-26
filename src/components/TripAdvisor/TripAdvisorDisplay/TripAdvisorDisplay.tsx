import { TripAdvisorRestaurant } from "@/util/restaurantTypes"
import "./TripAdvisorDisplay.css"
import RestaurantHistory from "@/components/RestaurantHistory/RestaurantHistory"
import TripAdvisorRestaurantImage from "../TripAdvisorRestaurantImage/TripAdvisorRestaurantImage"
import TripAdvisorButtons from "../TripAdvisorButtons/TripAdvisorButtons"
import TripAdvisorRatingRow from "../TripAdvisorRatingRow/TripAdvisorRatingRow"
import TripAdvisorCuisines from "../TripAdvisorCuisines/TripAdvisorCuisines"
import TripAdvisorHours from "../TripAdvisorHours/TripAdvisorHours"
import BigButton from "@/components/BigButton/BigButton"


export default function TripAdvisorDisplay({
    name,
    id,
    phoneNumber,
    address,
    price,
    restaurantImageUrl,
    ratingImageUrl,
    tripAdvisorUrl,
    hours,
    rating,
    reviewCount,
    cuisine
}: TripAdvisorRestaurant) {

    const consolidatedRestaurant: TripAdvisorRestaurant = {
        id,
        apiRespOrigin: "tripadvisor",
        name,
        phoneNumber,
        address,
        price,
        restaurantImageUrl,
        ratingImageUrl,
        tripAdvisorUrl,
        hours,
        rating,
        reviewCount,
        cuisine
    }


    return (
        <section className="w-100 ta-display__wrapper d-flex">
            <div className="ta-display__main d-flex flex-column gap-2">
                <TripAdvisorRestaurantImage
                    restaurantImageUrl={restaurantImageUrl}
                />
                <div className="ta__heading pt-2 w-100 d-flex flex-wrap justify-content-between align-items-center">
                    <span className="ta__heading__name">{name}</span>
                    <TripAdvisorButtons
                        phoneNumber={phoneNumber}
                        address={address}
                    />
                </div>
                <TripAdvisorRatingRow
                    restaurant={consolidatedRestaurant}
                />
                <TripAdvisorHours
                    hours={hours}
                />
                <BigButton
                    paddingSmall={true}
                    colorType="tripadvisor"
                />
            </div>
            <RestaurantHistory />
        </section>
    )
}


import { YelpRestaurant } from "@/util/restaurantTypes"
import "./YelpDisplay.css"
import YelpRestaurantImage from "../YelpRestaurantImage/YelpRestaurantImage"
import YelpHeading from "../YelpHeading/YelpHeading"
import YelpReview from "../YelpReview/YelpReview"
import YelpUtilButtons from "../YelpUtilButtons/YelpUtilButtons"
import RestaurantHistory from "@/components/RestaurantHistory/RestaurantHistory"
import BigButton from "@/components/BigButton/BigButton"
import CategoryButtons from "../CategoryButtons/CategoryButtons"

export default function YelpDisplay({
    id,
    name,
    rating,
    phoneNumber,
    price,
    address,
    yelpWebsiteUrl,
    restaurantImageUrl,
    categories,
    reviewCount,
    distance,
}: YelpRestaurant) {

    const consolidatedRestaurant: YelpRestaurant = {
        apiRespOrigin: "yelp",
        id,
        name,
        rating,
        phoneNumber,
        price,
        address,
        yelpWebsiteUrl,
        restaurantImageUrl,
        categories,
        reviewCount,
        distance
    }

    return (
        <section className="w-100 yelp-display__section d-flex">
            <div className="yelp-display__main d-flex flex-column">
                <YelpRestaurantImage
                    restaurantImageUrl={restaurantImageUrl}
                    yelpWebsiteUrl={yelpWebsiteUrl}
                />
                <div className="yelp-display__bottom d-flex flex-column gap-3">
                    <CategoryButtons
                        categories={categories}
                    />
                    <YelpHeading
                        name={name}
                    />
                    <YelpReview
                        restaurant={consolidatedRestaurant}
                    />
                    <YelpUtilButtons
                        phoneNumber={phoneNumber}
                        address={address}
                    />
                    <BigButton
                        buttonSize="small"
                        colorType="yelp"
                    />

                </div>
            </div>
            <RestaurantHistory />
        </section>
    )
}

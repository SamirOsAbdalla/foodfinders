
import { YelpRestaurant } from "@/util/restaurantTypes"
import "./YelpDisplay.css"
import YelpRestaurantImage from "../YelpRestaurantImage/YelpRestaurantImage"
import YelpHeading from "../YelpHeading/YelpHeading"
import YelpReview from "../YelpReview/YelpReview"
import YelpOpen from "../YelpOpen/YelpOpen"
import YelpUtilButtons from "../YelpUtilButtons/YelpUtilButtons"
import RestaurantHistory from "@/components/RestaurantHistory/RestaurantHistory"

export default function YelpDisplay({
    name,
    rating,
    phoneNumber,
    price,
    address,
    apiRespOrigin,
    yelpWebsiteUrl,
    restaurantImageUrl,
    categories,
    reviewCount,
    distance }: YelpRestaurant) {

    return (
        <section className="w-100 yelp__section d-flex">
            <div className="yelp__display__main d-flex flex-column">
                <YelpRestaurantImage
                    restaurantImageUrl={restaurantImageUrl}
                    yelpWebsiteUrl={yelpWebsiteUrl}
                />
                <div className="d-flex flex-column gap-3">
                    <YelpHeading
                        name={name}
                        categories={categories}
                    />
                    <YelpReview
                        rating={rating}
                        reviewCount={reviewCount}
                        price={price}
                    />
                    <YelpOpen
                        distance={distance}
                    />
                    <YelpUtilButtons
                        phoneNumber={phoneNumber}
                        address={address}
                    />
                </div>
            </div>
            <RestaurantHistory />
        </section>
    )
}

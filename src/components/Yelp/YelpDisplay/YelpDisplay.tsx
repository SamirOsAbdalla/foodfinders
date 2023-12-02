
import { YelpRestaurant } from "@/util/restaurantTypes"
import "./YelpDisplay.css"
import YelpRestaurantImage from "../YelpRestaurantImage/YelpRestaurantImage"
import YelpHeading from "../YelpHeading/YelpHeading"
import YelpReview from "../YelpReview/YelpReview"
import YelpOpen from "../YelpOpen/YelpOpen"
import YelpUtilButtons from "../YelpUtilButtons/YelpUtilButtons"
import RestaurantHistory from "@/components/RestaurantHistory/RestaurantHistory"
import BigButton from "@/components/BigButton/BigButton"

export default function YelpDisplay({
    name,
    rating,
    phoneNumber,
    price,
    address,
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
                <div className="yelp__display__bottom d-flex flex-column gap-3">
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
                    <BigButton
                        buttonSize="small"
                    />

                </div>
            </div>
            <RestaurantHistory />
        </section>
    )
}

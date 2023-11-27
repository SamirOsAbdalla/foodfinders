
import "./YelpRestaurantImage.css"
import Image from "next/image"

interface Props {
    restaurantImageUrl?: string
    yelpWebsiteUrl?: string
}

export default function YelpRestaurantImage({ restaurantImageUrl, yelpWebsiteUrl }: Props) {
    return (
        <div className="position-relative">
            {restaurantImageUrl &&
                <div className="w-100 restaurant__image position-relative">
                    <Image fill style={{ objectFit: "cover" }} src={restaurantImageUrl} alt="Restaurant Image" />
                </div>
            }
            {yelpWebsiteUrl &&
                <a href={yelpWebsiteUrl} target="_blank" className="yelp__website__link d-flex justify-content-center align-items-center position-absolute">
                    <Image src="/yelp_logo.svg" alt="Yelp Logo" width={70} height={25} />
                </a>
            }
        </div>
    )
}

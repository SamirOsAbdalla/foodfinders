
import FavoritesButton from "@/components/FavoritesButton/FavoritesButton";
import "./YelpOpen.css"
import { FaRegClock, FaHeart } from "react-icons/fa6";

const metersToMilesFactor = 0.000621371
interface Props {
    distance?: string
}
export default function YelpOpen({
    distance
}: Props) {

    return (
        <div className="d-flex flex-wrap gap-2 w-100 justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center gap-2">
                <div className="yelp__clock__container d-flex justify-content-start align-items-center gap-1">
                    <FaRegClock className="yelp__clock__icon" />
                    <span>Open Now</span>
                </div>
                <span>•</span>
                {/* TODO: Calculate distance from latitude and longitude later */}
                {distance &&
                    <div className="yelp__distance">
                        {(parseFloat(distance) * metersToMilesFactor).toFixed(1)} mi
                    </div>
                }
            </div>
            <FavoritesButton
                buttonOrigin="yelp"
            />
        </div>
    )
}

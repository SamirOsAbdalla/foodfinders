import "./FavoritesButton.css"
import { FaHeart } from "react-icons/fa6"
interface Props {
    buttonOrigin: "yelp" | "tripadvisor"
}
export default function FavoritesButton({
    buttonOrigin
}: Props) {
    return (
        <button className={`favorites__button ${buttonOrigin == "yelp" ? "yelp__button__red" : "tripadvisor__button__green"}`}>
            <FaHeart />
            Add To Favorites
        </button>
    )
}

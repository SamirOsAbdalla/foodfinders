import "./FavoritesButton.css"
import { FaHeart } from "react-icons/fa6"
interface Props {
    buttonOrigin: "yelp" | "tripadvisor"
}
export default function FavoritesButton({
    buttonOrigin
}: Props) {
    return (
        <button className={`favorites-button ${buttonOrigin == "yelp" ? "yelp-button--red" : "tripadvisor-button--green"}`}>
            <FaHeart />
            <span>Add To Favorites</span>
        </button>
    )
}

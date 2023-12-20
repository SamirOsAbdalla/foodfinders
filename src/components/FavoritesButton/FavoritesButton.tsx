import { TripAdvisorRestaurant, YelpRestaurant } from "@/util/restaurantTypes"
import "./FavoritesButton.css"
import {
    FaHeart,
    FaHeartCircleCheck
} from "react-icons/fa6"
import {
    addFavorite,
    removeFavorite
} from "@/redux/slices/favorites-slice"
import {
    useDispatch,
    useSelector
} from "react-redux"
import {
    AppDispatch,
    RootState
} from "@/redux/store"
import {
    useEffect,
    useState
} from "react"
import {
    signIn,
    useSession
} from "next-auth/react";
import { useRouter } from "next/navigation"


interface Props {
    buttonOrigin: "yelp" | "tripadvisor"
    favoriteItem: TripAdvisorRestaurant | YelpRestaurant
}

export default function FavoritesButton({
    buttonOrigin,
    favoriteItem
}: Props) {
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const [error, setError] = useState<string>("Error adding to favorites")

    const dispatch = useDispatch<AppDispatch>()
    let favorites = useSelector((state: RootState) => state.favoritesReducer.favorites)

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {

        if (favorites.find((favorite: TripAdvisorRestaurant | YelpRestaurant) => {
            return (favoriteItem.id == favorite.id)
        }) != undefined) {
            setIsAdded(true)
        } else {
            setIsAdded(false)
        }

    }, [favorites])

    const addFavoriteToMongo = async () => {
        const email = session?.user?.email
        const body = {
            email,
            favorite: favoriteItem
        }

        const fetchResp = await fetch("/api/favorites/addFavorite", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        return fetchResp.status


    }
    const removeFavoriteFromMongo = async () => {
        const email = session?.user?.email
        const body = {
            email,
            favoriteId: favoriteItem.id
        }

        const fetchResp = await fetch("/api/favorites/removeFavorite", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        return fetchResp.status
    }

    const addToFavorites = async () => {
        //check if logged in
        if (!session) {
            router.replace("/signIn")
            return;
        }

        if ((await addFavoriteToMongo()) == 200) {
            dispatch(addFavorite(favoriteItem))
        } else {
            setError("Error adding to favorites")
        }
    }


    const removeFromFavorites = async () => {
        if ((await removeFavoriteFromMongo()) == 200) {
            dispatch(removeFavorite(favoriteItem))
        } else {
            setError("Error removing favorites")
        }

    }

    return (
        <button onClick={isAdded ? removeFromFavorites : addToFavorites}
            className={`favorites-button ${isAdded ? `${buttonOrigin == "yelp" ? "yelp-button__added" : "tripadvisor-button__added"}` : ""} position-relative ${buttonOrigin == "yelp" ? "yelp-button--red" : "tripadvisor-button--green"}`}>
            {isAdded ?
                <FaHeartCircleCheck className="favorites-button__heart-check" /> :
                <FaHeart />
            }
            <span>
                {isAdded ?
                    "Added" :
                    "Add To Favorites"
                }
            </span>
        </button>
    )
}

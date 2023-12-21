"use client"
import React from 'react'
import {
    useEffect,
    useState
} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { RootState } from '@/redux/store'
import {
    setFavoritesEmail,
    setFavorites
} from '@/redux/slices/favorites-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { TripAdvisorRestaurant, YelpRestaurant } from '@/util/restaurantTypes'
import FavoritesCard from '@/components/FavoritesCard/FavoritesCard'
import styles from "./page.module.css"


const useFavoritesFilter = (favorites: (TripAdvisorRestaurant | YelpRestaurant)[]) => {
    const [clickFilter, setClickFilter] = useState<"yelp" | "tripadvisor" | "">("")
    const [searchFilter, setSearchFilter] = useState<string>("")
    const [areCategoriesIncluded, setAreCategoriesIncluded] = useState<boolean>(false)

    const handleClickFilterClick = (requestedFilter: "yelp" | "tripadvisor") => {
        clickFilter == requestedFilter ? setClickFilter("") : setClickFilter(requestedFilter)
    }

    const satisfiesClickFilter = (apiRespOrigin: "yelp" | "tripadvisor") => {
        return (clickFilter == "" || apiRespOrigin.includes(clickFilter))
    }

    const satisfiesSearchFilter = (favorite: TripAdvisorRestaurant | YelpRestaurant) => {
        const initialFilter = (searchFilter == "" || favorite.name?.toLowerCase().includes(searchFilter))

        if (initialFilter || favorite.apiRespOrigin == "tripadvisor" || (favorite.apiRespOrigin == "yelp" && !areCategoriesIncluded)) {
            return initialFilter
        }

        favorite = favorite as YelpRestaurant
        if (favorite.categories?.find((category: any) => category.title.toLowerCase().includes(searchFilter))) {
            return true
        }
    }

    const filteredFavorites = favorites.filter(favorite => {
        return (
            satisfiesClickFilter(favorite.apiRespOrigin) &&
            satisfiesSearchFilter(favorite)
        )
    })


    return {
        handleClickFilterClick,
        searchFilter,
        setSearchFilter,
        areCategoriesIncluded,
        setAreCategoriesIncluded,
        filteredFavorites
    }
}

export default function Favorites() {

    const favoritesReducer = useSelector((state: RootState) => state.favoritesReducer)
    const { data: session } = useSession()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const {
        handleClickFilterClick,
        searchFilter,
        setSearchFilter,
        filteredFavorites,
        areCategoriesIncluded,
        setAreCategoriesIncluded
    } = useFavoritesFilter(favoritesReducer.favorites)

    useEffect(() => {

        const fetchFavoritesFromMongo = async (email: string) => {
            const res = await fetch(`/api/favorites/getFavorites?email=${email}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })

            if (res.status == 200) {
                const resJSON = await res.json()
                return resJSON
            }

            return []
            //handle error
        }

        const handleFavoritesFetch = async (email: string) => {
            const favorites = await fetchFavoritesFromMongo(email)
            dispatch(setFavorites(favorites))
            dispatch(setFavoritesEmail(email))
        }

        if (!session) {
            router.replace("/signIn")
            return
        }

        let email = session.user?.email
        if (email && email != favoritesReducer.favoritesEmail) {
            //user changed so fetch initial favorites from mongo
            handleFavoritesFetch(email)
        }

    }, [session])




    return (
        <div className={styles.fc__wrapper}>
            <div>
                Filter by:
                <div onClick={() => handleClickFilterClick("yelp")}>Yelp</div>
                <div onClick={() => handleClickFilterClick("tripadvisor")}> TripAdvisor</div>
                <input value={searchFilter} onChange={(e) => setSearchFilter(e.target.value.toLowerCase())} />
                <button onClick={() => setAreCategoriesIncluded((currentOption) => !currentOption)}>
                    {areCategoriesIncluded ? "Name" : "Name and Categories"}
                </button>
            </div>
            {filteredFavorites.map(favorite => <FavoritesCard key={favorite.id} restaurant={favorite} />)}
        </div >
    )
}

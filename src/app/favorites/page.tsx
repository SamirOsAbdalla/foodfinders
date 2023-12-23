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
import SearchInput from '@/components/SearchInput/SearchInput'
import CardSkeletons from '@/components/CardSkeletons/CardSkeletons'


const useFavoritesFilter = (favorites: (TripAdvisorRestaurant | YelpRestaurant)[]) => {
    const [clickFilter, setClickFilter] = useState<"yelp" | "tripadvisor" | "">("")
    const [searchFilter, setSearchFilter] = useState<string>("")

    const handleClickFilterClick = (requestedFilter: "yelp" | "tripadvisor") => {
        clickFilter == requestedFilter ? setClickFilter("") : setClickFilter(requestedFilter)
    }

    const satisfiesClickFilter = (apiRespOrigin: "yelp" | "tripadvisor") => {
        return (clickFilter == "" || apiRespOrigin.includes(clickFilter))
    }

    const satisfiesSearchFilter = (favorite: TripAdvisorRestaurant | YelpRestaurant) => {
        const initialFilter = (searchFilter == "" || favorite.name?.toLowerCase().includes(searchFilter))

        if (initialFilter || favorite.apiRespOrigin == "tripadvisor") {
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
        clickFilter,
        handleClickFilterClick,
        searchFilter,
        setSearchFilter,
        filteredFavorites
    }
}

export default function Favorites() {

    const favoritesReducer = useSelector((state: RootState) => state.favoritesReducer)
    const { data: session } = useSession()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState<boolean>(false)

    const {
        clickFilter,
        handleClickFilterClick,
        searchFilter,
        setSearchFilter,
        filteredFavorites,
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
            setLoading(true)
            const favorites = await fetchFavoritesFromMongo(email)
            dispatch(setFavorites(favorites))
            dispatch(setFavoritesEmail(email))
            setLoading(false)
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
            <div className={`${styles.filters__container} d-flex flex-column align-items-center gap-3`}>
                <div className="d-flex align-items-center gap-3">
                    <div className={styles.favorites__text}>Filter by:</div>
                    <div className="d-flex gap-2">
                        <div onClick={() => handleClickFilterClick("yelp")} className={`${styles.click__filter} ${clickFilter == "yelp" ? `${styles.click__filter__yelp}` : ""}`}>Yelp</div>
                        <div onClick={() => handleClickFilterClick("tripadvisor")} className={`${styles.click__filter} ${clickFilter == "tripadvisor" ? `${styles.click__filter__tripadvisor}` : ""}`}> TripAdvisor</div>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center">
                    <SearchInput
                        value={searchFilter}
                        setValue={setSearchFilter}
                    />
                </div>
            </div>
            {loading && <CardSkeletons />}
            {!loading &&
                <div className={styles.cards__container}>
                    {filteredFavorites.map((favorite) => {
                        return (<FavoritesCard key={favorite.id} restaurant={favorite} />)
                    })}
                </div>
            }
        </div >
    )
}

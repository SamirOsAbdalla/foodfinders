import BigButton from '@/components/BigButton/BigButton'
import "./MainPage.css"
import HowToUseModal from '../HowToUseModal/HowToUseModal'
import RestaurantHistory from '../RestaurantHistory/RestaurantHistory'
import RestaurantDisplay from '../RestaurantDisplay/RestaurantDisplay'
import { YelpRestaurant } from '@/util/restaurantTypes'
const test: YelpRestaurant = {
    name: 'The Boil Daddy - Corona',
    restaurantImageUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/UPX2Oyeims-VIZhntFCEqQ/o.jpg',
    rating: 4.5,
    phoneNumber: '+19515318029',
    price: "$$$$",
    address: '490 Hidden Valley Pkwy Ste 102 Corona, CA 92879',
    apiRespOrigin: 'yelp',
    yelpWebsiteUrl: 'https://www.yelp.com/biz/the-boil-daddy-corona-corona-3?adjust_creative=vRLSvzbnXCwqOz85TNqaBg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=vRLSvzbnXCwqOz85TNqaBg',
    reviewCount: 4850,
    categories: [
        { alias: 'cajun', title: 'Cajun/Creole' },
        { alias: 'seafood', title: 'Seafood' },
        { alias: 'chicken_wings', title: 'Chicken Wings' }
    ],
    distance: "9942.805026107226"
}

export default function MainPage() {
    return (
        <section className="mainpage__wrapper">

            {/* <BigButton buttonSize='regular' />
            <div className="break"></div>
            <HowToUseModal /> */}
            <RestaurantDisplay {...test} />

        </section>
    )
}

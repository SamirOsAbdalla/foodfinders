import BigButton from '@/components/BigButton/BigButton'
import "./MainPage.css"
import HowToUseModal from '../HowToUseModal/HowToUseModal'
import RestaurantHistory from '../RestaurantHistory/RestaurantHistory'

export default function MainPage() {
    return (

        <section className="mainpage__wrapper">
            <div className="mainpage__modals position-absolute d-flex justify-content-around w-100">
                <HowToUseModal />
                <RestaurantHistory />
            </div>
            <BigButton />
        </section>
    )
}

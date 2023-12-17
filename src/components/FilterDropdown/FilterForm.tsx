import {
    Dispatch,
    SetStateAction,
    useEffect
} from "react";
import FormHeader from "./FormHeader";
import FormPrices from "./FormPrices";
import { DropdownStatus } from "../Navbar/Navbar";
import { useForm } from "react-hook-form";
import {
    PossiblePrices,
    AcceptedFoodFilters,
    FiltersObject
} from "@/util/restaurantTypes";
import FormCuisines from "./FormCuisines";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    AppDispatch,
    RootState
} from "@/redux/store";
import { setFilters } from "@/redux/slices/filter-slice";
import FormDistance from "./FormDistance";


const cuisinesDefaultArray: AcceptedFoodFilters[] = []
const pricesDefaultArray: PossiblePrices[] = []

function useFilters(closeForm: () => any) {
    const dispatch = useDispatch<AppDispatch>()
    let reduxFilterState = useSelector((state: RootState) => state.filterReducer.value)

    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            cuisines: cuisinesDefaultArray,
            prices: pricesDefaultArray,
            filterDistance: "13"
        }
    })

    const watchAllFields = watch()

    useEffect(() => {
        setValue("cuisines", reduxFilterState.cuisines)
        setValue("prices", reduxFilterState.prices)
        setValue("filterDistance", reduxFilterState.filterDistance)
    }, [reduxFilterState])

    const submitHandler = handleSubmit((data: FiltersObject) => {
        dispatch(setFilters(data))
        closeForm()
    })

    return {
        register,
        watchAllFields,
        submitHandler
    }
}

interface Props {
    closeForm: () => any
}
export default function FilterForm({
    closeForm
}: Props) {

    const {
        register,
        watchAllFields,
        submitHandler,
    } = useFilters(closeForm)

    return (
        <form onSubmit={submitHandler} className="filter-dropdown__form position-absolute start-50 translate-middle d-flex flex-column gap-4">
            <FormHeader
                closeForm={closeForm}
            />
            <FormDistance
                watchAllFields={watchAllFields}
                register={register}
            />
            <FormPrices
                watchAllFields={watchAllFields}
                register={register}
            />
            <FormCuisines
                watchAllFields={watchAllFields}
                register={register}
            />
        </form>
    )
}

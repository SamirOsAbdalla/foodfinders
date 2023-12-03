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
    AcceptedFoodFilters
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
            prices: pricesDefaultArray
        }
    })

    const watchAllFields = watch()

    useEffect(() => {
        setValue("cuisines", reduxFilterState.cuisines)
        setValue("prices", reduxFilterState.prices)
    }, [reduxFilterState])

    const submitHandler = handleSubmit((data: { cuisines: AcceptedFoodFilters[], prices: PossiblePrices[] }) => {
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

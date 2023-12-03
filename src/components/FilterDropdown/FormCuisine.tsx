import { AcceptedFoodFilters, PossiblePrices } from "@/util/restaurantTypes"
import {
    UseFormRegister,
    FieldValues,
} from "react-hook-form"

interface Props {
    cuisine: AcceptedFoodFilters,
    register: UseFormRegister<any>
    isClicked: boolean
}

export default function FormCuisine({
    cuisine,
    register,
    isClicked
}: Props) {
    return (
        <label className="filter-form__label">
            <input type="checkbox" value={cuisine} {...register("cuisines")} className="d-none" />
            <span className={`filter-form__button filter-form__button--large ${isClicked ? "filter-form__button--clicked" : ""} d-flex justify-content-center align-items-center`}>
                {cuisine}
            </span>
        </label>
    )
}


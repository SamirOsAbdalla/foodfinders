import { PossiblePrices } from "@/util/restaurantTypes"
import {
    UseFormRegister,
    FieldValues,
} from "react-hook-form"

interface Props {
    price: PossiblePrices,
    register: UseFormRegister<any>
    isClicked: boolean
}

export default function FormPrice({
    price,
    register,
    isClicked
}: Props) {
    return (
        <label className="filter-form__label">
            <input type="checkbox" value={price} {...register("prices")} className="d-none" />
            <span className={`filter-form__button ${isClicked ? "filter-form__button--clicked" : ""} d-flex justify-content-center align-items-center`}>
                {price}
            </span>
        </label>
    )
}

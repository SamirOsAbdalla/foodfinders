
import { PossiblePrices } from "@/util/restaurantTypes"
import {
    UseFormRegister,
    FieldValues
} from "react-hook-form"
import FormPrice from "./FormPrice"

let possiblePricesArray: PossiblePrices[] = [
    "$",
    "$$",
    "$$$",
    "$$$$"
]

interface Props {
    register: UseFormRegister<any>
    watchAllFields: any
}
export default function FormPrices({
    register,
    watchAllFields
}: Props) {

    const isPriceClicked = (price: PossiblePrices) => {
        return watchAllFields.prices.includes(price)
    }

    return (
        <div className="w-100 filter-form__section">
            <div>Prices</div>
            <div className=" w-100 filter-form__button__container d-flex flex-wrap gap-2">
                {possiblePricesArray.map(price => (
                    <FormPrice
                        key={price}
                        price={price}
                        register={register}
                        isClicked={isPriceClicked(price)}
                    />
                ))}
            </div>
        </div>
    )
}

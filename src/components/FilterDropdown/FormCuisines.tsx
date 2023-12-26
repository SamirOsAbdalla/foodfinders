import { UseFormRegister } from "react-hook-form"
import { AcceptedFoodFilters } from "@/util/restaurantTypes"
import FormCuisine from "./FormCuisine"

interface Props {
    register: UseFormRegister<any>
    watchAllFields: any
}

let cuisineOptions: AcceptedFoodFilters[] = [
    "Breakfast",
    "Burgers",
    "Pizza",
    "Sushi",
    "Sandwiches",
    "Chinese",
    "Mexican",
    "Steak",
    "Seafood",
    "Thai",
    "Japanese",
    "Mediterranean"
]

export default function FormCuisines({
    register,
    watchAllFields
}: Props) {

    const isCuisineClicked = (cuisine: string) => {
        return watchAllFields.cuisines.includes(cuisine)
    }

    return (
        <div className="w-100 filter-form__section">
            <div>Cuisines</div>
            <div className=" w-100 filter-form__button__container d-flex flex-wrap gap-2">
                {cuisineOptions.map((cuisine) => (
                    <FormCuisine
                        key={cuisine}
                        cuisine={cuisine}
                        register={register}
                        isClicked={isCuisineClicked(cuisine)}
                    />
                ))}
            </div>
        </div>
    )
}

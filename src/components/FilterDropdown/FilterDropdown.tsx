"use client"
import { Dispatch, SetStateAction } from "react"
import "./FilterDropdown.css"
import { DropdownStatus } from "../Navbar/Navbar"
import { MouseEvent } from 'react';
import MainFilterOption from "../MainFilterOption/MainFilterOption";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { setFilters } from "@/redux/slices/filter-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PriceType } from "@/redux/slices/filter-slice";
interface Props {
    filterDropdownStatus: DropdownStatus,
    setFilterDropdownStatus: Dispatch<SetStateAction<DropdownStatus>>
}


let defaultCuisine = [
    "Breakfast", "Burgers", "Pizza", "Sushi",
    "Sandwiches", "Chinese", "Mexican"
]
let pricesArray: PriceType[] = ["$", "$$", "$$$", "$$$$"]
//Have to set these variables since react-hook-form complains about the typing when using setValue
let defaultCuisineArray: string[] = []
let defaultPricesArray: PriceType[] = []

export default function FilterDropdown({
    filterDropdownStatus,
    setFilterDropdownStatus
}: Props) {
    if (filterDropdownStatus != "open") {
        return (<></>)
    }

    const dispatch = useDispatch<AppDispatch>()
    const reduxFilterState = useSelector((state: RootState) => state.filterReducer.value)

    const {
        register,
        handleSubmit,
        watch,
        setValue
    } = useForm({
        defaultValues: { cuisine: defaultCuisineArray, prices: defaultPricesArray }
    });
    const watchAllFields = watch()


    useEffect(() => {
        setValue("cuisine", reduxFilterState.cuisine)
        setValue("prices", reduxFilterState.prices)
    }, [reduxFilterState])

    const handleFilterWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let htmlTarget = e.target as HTMLElement
        if (!htmlTarget.classList.contains("filterdropdown__wrapper")) {
            return;
        }
        setFilterDropdownStatus("closed")
    }

    const onSubmit = (data: { cuisine: string[], prices: PriceType[] }) => {
        //dispatch redux action to filter reducer
        dispatch(setFilters(data))
        setFilterDropdownStatus("closed")
    }

    const foodItemIsClicked = (foodName: string) => {
        return watchAllFields.cuisine.includes(foodName)
    }

    const priceItemIsClicked = (price: PriceType) => {
        return watchAllFields.prices.includes(price)
    }
    return (
        <div data-testid="filterdropdown" onClick={(e) => handleFilterWrapperClick(e)} className="filterdropdown__wrapper position-fixed">
            <form onSubmit={handleSubmit(onSubmit)} className="position-absolute filterdropdown__form form-group p-3 d-flex flex-column gap-4">
                <div className="d-flex justify-content-between gap-5 filterdropdown__top">
                    <div onClick={() => setFilterDropdownStatus("closed")} className="filterdropdown__top__clickable">Cancel</div>
                    <div className="filterdropdown__title">Filters</div>
                    <button type="submit" className="filterdropdown__top__clickable filterdropdown__top__apply">Apply</button>
                </div>
                <div className="d-flex flex-column justify-content-start gap-2 ">
                    <div>Prices</div>
                    <div className="d-flex gap-3 flex-wrap filterdropdown__section__container p-3">
                        {pricesArray.map(price => (
                            <label className="filterdropdown__label m-0" key={price}>
                                <input type="checkbox" className="d-none" value={price} {...register("prices")} />
                                {priceItemIsClicked(price) ?
                                    <span data-testid="filterdropdown__price__active" className={`filterdropdown__price filterdropdown__price__active p-2`}>
                                        {price}
                                    </span> :
                                    <span data-testid="filterdropdown__price" className={`filterdropdown__price p-2`}>
                                        {price}
                                    </span>
                                }
                            </label>
                        ))}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-start gap-2">
                    <div>Cuisine</div>
                    <div className="d-flex gap-3 flex-wrap filterdropdown__section__container p-3">
                        {defaultCuisine.map(foodType => {
                            return (
                                <label key={foodType} className="filterdropdown__label m-0">
                                    <input type="checkbox" className="d-none" value={foodType} {...register("cuisine")} />
                                    {foodItemIsClicked(foodType) ?
                                        <span data-testid="filterdropdown__foodtype__active" className={`filterdropdown__foodtype filterdropdown__foodtype__active p-2`}>
                                            {foodType}
                                        </span> :
                                        <span data-testid="filterdropdown__foodtype" className={`filterdropdown__foodtype p-2`}>
                                            {foodType}
                                        </span>
                                    }
                                </label>
                            )
                        })}
                    </div>
                </div>
            </form>
        </div>
    )
}

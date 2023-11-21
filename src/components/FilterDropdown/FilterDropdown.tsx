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

interface Props {
    setFilterDropdownStatus: Dispatch<SetStateAction<DropdownStatus>>
}

const mainFilterOptions = ["Cheap"]
let defaultFoodTypes = [
    "Breakfast", "Burgers", "Pizza", "Sushi",
    "Sandwiches", "Chinese", "Mexican"
]

let defaultStringArray: string[] = []
export default function FilterDropdown({ setFilterDropdownStatus }: Props) {
    const dispatch = useDispatch<AppDispatch>()
    const reduxFilterState = useSelector((state: RootState) => state.filterReducer.value)
    const {
        register,
        handleSubmit,
        formState,
        getValues,
        watch,
        setValue
    } = useForm({
        defaultValues: { foodTypes: defaultStringArray, mainOptions: defaultStringArray }
    });
    const watchAllFields = watch()

    useEffect(() => {
        setValue("foodTypes", reduxFilterState.foodTypes)
        setValue("mainOptions", reduxFilterState.mainOptions)
    }, [reduxFilterState])

    const handleFilterWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let htmlTarget = e.target as HTMLElement
        if (!htmlTarget.classList.contains("filterdropdown__wrapper")) {
            return;
        }
        setFilterDropdownStatus("closed")
    }

    const onSubmit = (data: { foodTypes: string[], mainOptions: string[] }) => {
        //dispatch redux action to filter reducer
        dispatch(setFilters(data))
        setFilterDropdownStatus("closed")
    }

    const foodItemIsClicked = (foodName: string) => {
        return watchAllFields.foodTypes.includes(foodName)
    }
    return (
        <div data-testid="filterdropdown" onClick={(e) => handleFilterWrapperClick(e)} className="filterdropdown__wrapper position-fixed">
            <form onSubmit={handleSubmit(onSubmit)} className="position-absolute filterdropdown__form form-group p-3 d-flex flex-column gap-4">
                <div className="d-flex justify-content-between gap-5 filterdropdown__top">
                    <div onClick={() => setFilterDropdownStatus("closed")} className="filterdropdown__top__clickable">Cancel</div>
                    <div>Filters</div>
                    <button type="submit" className="filterdropdown__top__clickable filterdropdown__top__apply">Apply</button>
                </div>
                <div className="d-flex flex-column gap-2 p-3 mainfilteroptions__container">
                    {mainFilterOptions.map(filterOption => {
                        return (
                            <MainFilterOption
                                register={register}
                                key={filterOption}
                                optionName={filterOption}
                            />
                        )
                    })}
                </div>
                <div className="d-flex flex-column justify-content-start gap-2">
                    <div>Food Types</div>
                    <div className="d-flex gap-3 flex-wrap filterdropdown__fooditems__container p-3">
                        {defaultFoodTypes.map(foodName => {
                            return (
                                <label key={foodName} className="filterdropdown__label m-0">
                                    <input type="checkbox" className="d-none" value={foodName} {...register("foodTypes")} />
                                    {foodItemIsClicked(foodName) ?
                                        <span data-testid="filterdropdown__foodname__active" className={`filterdropdown__foodname filterdropdown__fooditem__active p-2`}>
                                            {foodName}
                                        </span> :
                                        <span data-testid="filterdropdown__foodname" className={`filterdropdown__foodname p-2`}>
                                            {foodName}
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

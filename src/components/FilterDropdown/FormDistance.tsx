import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props {
    register: UseFormRegister<any>
    watchAllFields: any
}

export default function FormDistance({
    register,
    watchAllFields
}: Props) {

    return (
        <div className="w-100 filter-form__section">
            <div>Distance</div>
            <div className="w-100 slider__container d-flex justify-content-between">
                <input type="range" className="form-range slider__input" {...register("filterDistance")} min="1" max="25" step="1" />
                <div>{watchAllFields.filterDistance} mi</div>
            </div>
        </div>
    )
}

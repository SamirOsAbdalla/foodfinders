import React, {
    Dispatch,
    SetStateAction
} from 'react'

interface Props {
    value: string,
    type: string,
    setValue: Dispatch<SetStateAction<string>>,
    placeholder: string
}
export default function PageInput({
    value,
    setValue,
    type,
    placeholder
}: Props) {
    return (
        <div className="page-input__container position-relative d-flex justify-content-center">
            <input type={type} value={value} onChange={(e) => setValue(e.target.value)} className="page-input__input" required autoComplete="off" />
            <label className="page-input__label">{placeholder}</label>
        </div>
    )
}

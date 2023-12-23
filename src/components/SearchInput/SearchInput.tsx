

import React from 'react'
import { IoSearch } from "react-icons/io5";
import "./SearchInput.css"
interface Props {
    value: string,
    setValue: (e: any) => any
}
export default function SearchInput({
    value,
    setValue
}: Props) {
    return (
        <div className="search__input--container position-relative d-flex align-items-center justify-content-start">
            <IoSearch className="search__input__search--icon position-absolute" />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                className="search__input"
                placeholder="Search..."
            />
        </div>
    )
}

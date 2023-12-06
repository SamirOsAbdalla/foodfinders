import "./FilterDropdown.css"
import { DropdownStatus } from "../Navbar/Navbar"
import {
    Dispatch,
    SetStateAction
} from "react"
import FilterForm from "./FilterForm"
import FormPrices from "./FormPrices"

interface Props {
    filterDropdownStatus: DropdownStatus,
    closeForm: () => any
}

export default function FilterDropdown({

    filterDropdownStatus,
    closeForm

}: Props) {
    if (filterDropdownStatus == "closed") {
        return (<></>)
    }

    const wrapperClassName = "filter-dropdown__wrapper"
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let target = e.target as HTMLElement
        if (!target.classList.contains(wrapperClassName)) {
            return
        }
        closeForm()
    }

    return (
        <div data-testid="filter-dropdown" onClick={(e) => handleWrapperClick(e)} className={`${wrapperClassName} position-fixed top-0 start-0 end-0 bottom-0`}>
            <FilterForm
                closeForm={closeForm}
            />
        </div>
    )
}

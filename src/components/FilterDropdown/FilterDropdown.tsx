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

    return (
        <div className="filter-dropdown__wrapper position-fixed top-0 start-0 end-0 bottom-0">
            <FilterForm
                closeForm={closeForm}
            />
        </div>
    )
}

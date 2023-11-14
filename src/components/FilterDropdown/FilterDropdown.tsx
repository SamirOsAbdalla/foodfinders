import { Dispatch, SetStateAction } from "react"
import "./FilterDropdown.css"
import { DropdownStatus } from "../Navbar/Navbar"
import { MouseEvent } from 'react';
import MainFilterOption from "../MainFilterOption/MainFilterOption";


interface Props {
    setFilterDropdownStatus: Dispatch<SetStateAction<DropdownStatus>>
}
const mainFilterOptions = ["Top Rated", "Open Now"]
export default function FilterDropdown({
    setFilterDropdownStatus
}: Props) {

    const handleFilterWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
        let htmlTarget = e.target as HTMLElement
        if (!htmlTarget.classList.contains("filterdropdown__wrapper")) {
            return;
        }
        setFilterDropdownStatus("closed")
    }
    return (
        <div onClick={(e) => handleFilterWrapperClick(e)} className="filterdropdown__wrapper position-fixed">
            <form className="position-absolute filterdropdown__form form-group p-3 d-flex flex-column gap-4">
                <div>Filter Options</div>
                <div className="d-flex flex-column gap-2 p-3 mainfilteroptions__container">
                    {mainFilterOptions.map(filterOption => {
                        return (
                            <MainFilterOption
                                key={filterOption}
                                optionName={filterOption}
                            />
                        )
                    })}
                </div>
            </form>
        </div>
    )
}

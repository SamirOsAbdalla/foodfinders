"use client"
import "./Navbar.css"
import { BsFillPersonFill } from "react-icons/bs"
import { RiFilter3Fill } from "react-icons/ri"
import { useState } from "react"
import AccountDropdown from "../AccountDropdown/AccountDropdown"
import FilterDropdown from "../FilterDropdown/FilterDropdown"

export type DropdownStatus = "open" | "closed"
export default function Navbar() {
    const [accountDropdownStatus, setAccountDropdownStatus] = useState<DropdownStatus>("closed")
    const [filterDropdownStatus, setFilterDropdownStatus] = useState<DropdownStatus>("closed")

    //could probably figure out a way to combine these two functions
    //but it's fine for now seeing as they are quite small
    const toggleAccountDropdownStatus = () => {
        setFilterDropdownStatus("closed")
        if (accountDropdownStatus == "open") {
            setAccountDropdownStatus("closed")
            return;
        }
        setAccountDropdownStatus("open")
    }
    const toggleFilterDropdownStatus = () => {
        setAccountDropdownStatus("closed")
        if (filterDropdownStatus == "open") {
            setFilterDropdownStatus("closed")
            return;
        }
        setFilterDropdownStatus("open")
    }

    return (
        <nav className="navbar p-3 d-flex justify-content-between bg-primary position-fixed w-100">
            <span className="navbar-brand m-0 h1">FindMeFood</span>
            <div className="d-flex align-items-center gap-5">
                <div className="position-relative">
                    <BsFillPersonFill onClick={toggleAccountDropdownStatus} className="navbar__icon" />
                    {accountDropdownStatus == "open" && <AccountDropdown />}
                </div>
                <div className="position-relative">
                    <RiFilter3Fill data-testid="navbar__filter__icon" onClick={toggleFilterDropdownStatus} className="navbar__icon" />
                </div>
            </div>
            {filterDropdownStatus == "open" && <FilterDropdown setFilterDropdownStatus={setFilterDropdownStatus} />}
        </nav>
    )
}

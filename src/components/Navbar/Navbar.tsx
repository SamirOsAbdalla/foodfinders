"use client"
import "./Navbar.css"
import { BsFillPersonFill } from "react-icons/bs"
import { TbFilters } from "react-icons/tb";
import { useState, useRef, useEffect } from "react"
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
    const accountDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.onclick = (event) => {
            let htmlTarget = event.target as HTMLElement
            if (!accountDropdownRef.current?.contains(htmlTarget)) {
                setAccountDropdownStatus("closed")
            }
        }
    }, [])
    return (
        <nav className="navbar d-flex justify-content-center p-3 bg-white position-fixed">
            <div className="navbar__container d-flex justify-content-between">
                <span className="navbar-brand m-0 h1">SpeedEats</span>
                <div className="d-flex align-items-center gap-5">
                    <div ref={accountDropdownRef} className="position-relative">
                        <BsFillPersonFill onClick={toggleAccountDropdownStatus} className="navbar__icon" />
                        {accountDropdownStatus == "open" &&
                            <AccountDropdown
                                setAccountDropdownStatus={setAccountDropdownStatus}
                            />
                        }
                    </div>
                    <div className="position-relative">
                        <button data-testid="navbar__filter__button"
                            className="filter__button d-flex align-items-center justify-content-center"
                            onClick={toggleFilterDropdownStatus}
                        >
                            Filters
                            <TbFilters />
                        </button>
                    </div>
                </div>
                {filterDropdownStatus == "open" && <FilterDropdown setFilterDropdownStatus={setFilterDropdownStatus} />}
            </div>

        </nav>
    )
}

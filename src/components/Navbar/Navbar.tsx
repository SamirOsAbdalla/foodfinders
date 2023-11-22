"use client"
import "./Navbar.css"
import { BsFillPersonFill } from "react-icons/bs"
import { TbFilters } from "react-icons/tb";
import { useState, useRef, useEffect } from "react"
import AccountDropdown from "../AccountDropdown/AccountDropdown"
import FilterDropdown from "../FilterDropdown/FilterDropdown"
import Link from "next/link";
import { HiLogout } from "react-icons/hi";
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
    const navbarDropdownRef = useRef<HTMLDivElement>(null)

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
            <div className="navbar__container d-flex justify-content-between align-items-center">
                <div className="navbar__hamburger">

                </div>
                <div className="d-flex navbar__left align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center navbar__brand navbar-brand m-0 h1">SpeedEats</div>
                    <Link className="text-decoration-none navbar__about" href="/about">
                        About
                    </Link>
                </div>
                <div className="d-flex align-items-center gap-4">
                    <div ref={accountDropdownRef} className="navbar__icon__container position-relative">
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
                            <span className="navbar__filters__text">Filters</span>
                            <TbFilters />
                        </button>
                    </div>
                </div>
                {filterDropdownStatus == "open" && <FilterDropdown setFilterDropdownStatus={setFilterDropdownStatus} />}
            </div>
            <div className="navbar__dropdown w-100 d-flex pt-3 align-items-start flex-column gap-4" ref={navbarDropdownRef}>
                <Link className="navbar__dropdown__text text-decoration-none" href="/favorites">
                    Favorites
                </Link>
                <Link className="navbar__dropdown__text text-decoration-none" href="/about">
                    About
                </Link>
                <Link href="/login" className="text-decoration-none logout__button d-flex align-items-center justify-content-center">
                    Logout
                    <HiLogout />
                </Link>
            </div>
        </nav>
    )
}

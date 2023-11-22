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
    const [hamburgerStatus, setHamburgerStatus] = useState<DropdownStatus>("closed")

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
        setHamburgerStatus("closed")
    }
    const accountDropdownRef = useRef<HTMLDivElement>(null)
    const navbarDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.onclick = (event) => {
            let htmlTarget = event.target as HTMLElement
            console.log(htmlTarget)
            if (!accountDropdownRef.current?.contains(htmlTarget)) {
                setAccountDropdownStatus("closed")
            }


            if (!navbarDropdownRef.current?.contains(htmlTarget) && !(htmlTarget.classList.contains("navbar__hamburger__container") || htmlTarget.classList.contains("navbar__hamburger"))) {
                setHamburgerStatus("closed")
            }
        }
    }, [])

    const handleHamburgerClick = (e: React.MouseEvent<HTMLDivElement>) => {

        hamburgerStatus == "closed" ? setHamburgerStatus("open") : setHamburgerStatus("closed")

    }

    return (
        <nav className="navbar d-flex justify-content-center p-3 bg-white position-fixed">
            <div className={`navbar__container ${hamburgerStatus == "open" && "navbar__container__open"} d-flex justify-content-between align-items-center`}>
                <div onClick={handleHamburgerClick} className="navbar__hamburger__container">
                    <div className="navbar__hamburger">

                    </div>
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
            {hamburgerStatus == "open" &&
                <div className="navbar__dropdown justify-content-start align-items-start flex-column gap-4" ref={navbarDropdownRef}>
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
            }

        </nav>
    )
}

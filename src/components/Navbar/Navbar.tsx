"use client"

import "./Navbar.css"
import {
    useState,
} from "react"
import AccountDropdown from "../AccountDropdown/AccountDropdown"
import FilterDropdown from "../FilterDropdown/FilterDropdown"
import Hamburger from "./Hamburger";
import NavbarLink from "./NavbarLink";
import NavbarButtonDropdowns from "./NavbarButtonDropdowns";
import NavbarDropdown from "./NavbarDropdown";



export type DropdownStatus = "open" | "closed"

export default function Navbar() {

    const [hamburgerStatus, setHamburgerStatus] = useState<DropdownStatus>("closed")

    const closeHamburger = () => {
        setHamburgerStatus("closed")
    }
    return (
        <nav className="position-fixed p-3 bg-white d-flex justify-content-center flex-wrap">
            <div className={`navbar__container ${hamburgerStatus == "open" && "navbar__container--open"} d-flex justify-content-between align-items-center`}>
                <Hamburger
                    hamburgerStatus={hamburgerStatus}
                    setHamburgerStatus={setHamburgerStatus}
                />
                <div className="d-flex align-items-center gap-3">
                    <div className="navbar__brand m-0 d-flex align-items-center justify-content-center">SpeedEats</div>
                    <NavbarLink
                        text="About"
                        linkhref="/about"
                    />
                </div>
                <NavbarButtonDropdowns
                    closeHamburger={closeHamburger}
                />
            </div>
            <NavbarDropdown
                hamburgerStatus={hamburgerStatus}
                closeHamburger={closeHamburger}
            />
        </nav>
    )
}

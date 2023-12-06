import { DropdownStatus } from "./Navbar"
import { Dispatch, SetStateAction, useState } from "react"

interface Props {
    hamburgerStatus: DropdownStatus,
    setHamburgerStatus: Dispatch<SetStateAction<DropdownStatus>>
}
export default function Hamburger({
    hamburgerStatus,
    setHamburgerStatus
}: Props) {

    const handleHamburgerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        hamburgerStatus == "closed" ? setHamburgerStatus("open") : setHamburgerStatus("closed")
    }

    return (
        <div data-testid="navbar__hamburger" onClick={handleHamburgerClick} className="navbar__hamburger--container">
            <div className="navbar__hamburger">

            </div>
        </div>
    )
}

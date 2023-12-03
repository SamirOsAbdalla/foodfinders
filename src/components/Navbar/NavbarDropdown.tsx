import {
    useRef,
    useEffect,
    Dispatch,
    SetStateAction
} from "react"
import { DropdownStatus } from "./Navbar"
import NavbarLink from "./NavbarLink"
import Link from "next/link"
import { HiLogout } from "react-icons/hi"

interface Props {
    hamburgerStatus: DropdownStatus,
    setHamburgerStatus: Dispatch<SetStateAction<DropdownStatus>>
}

export default function NavbarDropdown({
    hamburgerStatus,
    setHamburgerStatus
}: Props) {

    const navbarDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.onclick = (event) => {
            let htmlTarget = event.target as HTMLElement
            if (!navbarDropdownRef.current?.contains(htmlTarget) &&
                !(htmlTarget.classList.contains("navbar__hamburger--container") || htmlTarget.classList.contains("navbar__hamburger"))) {
                setHamburgerStatus("closed")
            }
        }
    }, [])

    if (hamburgerStatus != "open") {
        return (<></>)
    }
    return (
        <div ref={navbarDropdownRef} className="navbar__dropdown justify-content-start align-items-start flex-column gap-4">
            <Link href="/about" className="text-decoration-none dropdown__link">
                About
            </Link>
            <Link href="/login" className="navbar__button--wide navbar__button--black text-decoration-none d-flex align-items-center justify-content-center align-self-center">
                Logout
                <HiLogout />
            </Link>
        </div>
    )
}

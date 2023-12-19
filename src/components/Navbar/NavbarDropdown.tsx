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
    closeHamburger: () => any
}

export default function NavbarDropdown({
    hamburgerStatus,
    closeHamburger
}: Props) {

    const navbarDropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.onclick = (event) => {
            let htmlTarget = event.target as HTMLElement
            if (!navbarDropdownRef.current?.contains(htmlTarget) &&
                !(htmlTarget.classList.contains("navbar__hamburger--container") || htmlTarget.classList.contains("navbar__hamburger"))) {
                closeHamburger()
            }
        }
    }, [])

    if (hamburgerStatus != "open") {
        return (<div data-testid="navbar__dropdown--closed"></div>)
    }
    return (
        <div ref={navbarDropdownRef} data-testid="navbar__dropdown" className="navbar__dropdown justify-content-start align-items-start flex-column gap-4">
            <Link onClick={closeHamburger} href="/faq" className="text-decoration-none dropdown__link">
                FAQ
            </Link>
            <Link onClick={closeHamburger} href="/about" className="text-decoration-none dropdown__link">
                About
            </Link>
            {/* <Link href="/login" className="navbar__button--wide navbar__button--black text-decoration-none d-flex align-items-center justify-content-center align-self-center">
                Logout
                <HiLogout />
            </Link> */}
        </div>
    )
}

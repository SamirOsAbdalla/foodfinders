import "./AccountDropdown.css"
import Link from 'next/link'
import { HiLogout } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import DropdownLink from "./DropdownLink";
import { DropdownStatus } from "../Navbar/Navbar";

interface Props {
    dropdownStatus: DropdownStatus
    closeAccountDropdown: () => any
}
export default function AccountDropdown({
    dropdownStatus,
    closeAccountDropdown
}: Props) {

    if (dropdownStatus == "closed") {
        return (
            <></>
        )
    }


    // Practicing with SOLID principles led to me try and implement the links using the
    // open closed principle
    return (
        <div data-testid="account-dropdown" className="account-dropdown__wrapper py-2  position-absolute d-flex flex-column gap-2">
            <DropdownLink
                closeAccountDropdown={closeAccountDropdown}
                text="Favorites"
                linkhref="/favorites"
            >
                <MdOutlineFavoriteBorder />
            </DropdownLink>
            <DropdownLink
                closeAccountDropdown={closeAccountDropdown}
                text="Login"
                linkhref="/signIn"
            >
                <HiLogout />
            </DropdownLink>
        </div>
    )
}

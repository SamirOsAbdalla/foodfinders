import "./AccountDropdown.css"
import Link from 'next/link'
import { HiLogout, HiLogin } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import DropdownLink from "./DropdownLink";
import { DropdownStatus } from "../Navbar/Navbar";
import { signOut, useSession } from "next-auth/react";

interface Props {
    dropdownStatus: DropdownStatus
    closeAccountDropdown: () => any
}
export default function AccountDropdown({
    dropdownStatus,
    closeAccountDropdown
}: Props) {
    const { data: session } = useSession()

    if (dropdownStatus == "closed") {
        return (
            <></>
        )
    }


    const onClickLogout = async () => {
        closeAccountDropdown()
        await signOut()
    }

    // Practicing with SOLID principles led to me try and implement the links using the
    // open closed principle
    return (
        <div data-testid="account-dropdown" className="account-dropdown__wrapper py-2  position-absolute d-flex flex-column gap-2">
            <DropdownLink
                onClick={closeAccountDropdown}
                text="Favorites"
                linkhref="/favorites"
            >
                <MdOutlineFavoriteBorder />
            </DropdownLink>

            {session ?
                <DropdownLink
                    onClick={onClickLogout}
                    text="Logout"
                    linkhref=""
                >
                    <HiLogout />
                </DropdownLink> :
                <DropdownLink
                    onClick={closeAccountDropdown}
                    text="Login"
                    linkhref="/signIn"
                >
                    <HiLogin />
                </DropdownLink>
            }

        </div>
    )
}

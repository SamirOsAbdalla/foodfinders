import React, { SetStateAction, Dispatch } from 'react'
import Link from 'next/link'
import "./AccountDropdown.css"
import { HiLogout } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useRef, useEffect } from "react"
import { DropdownStatus } from '../Navbar/Navbar';

interface Props {
    setAccountDropdownStatus: Dispatch<SetStateAction<DropdownStatus>>
}
export default function AccountDropdown({ setAccountDropdownStatus }: Props) {

    return (
        <div className="accountdropdown__wrapper position-absolute d-flex flex-column py-2 gap-2">
            <Link href="/saved" className="d-flex align-items-center justify-content-between gap-3 w-100 text-decoration-none accountdropdown__link">
                Favorites
                <MdOutlineFavoriteBorder />
            </Link>
            <Link href="/login" className="d-flex align-items-center justify-content-between gap-3 text-decoration-none accountdropdown__link">
                {/*Get Session*/}
                Logout
                <HiLogout />
            </Link>
        </div>
    )
}

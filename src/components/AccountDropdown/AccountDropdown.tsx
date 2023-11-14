import React from 'react'
import Link from 'next/link'
import "./AccountDropdown.css"
export default function AccountDropdown() {
    return (
        <div className="accountdropdown__wrapper position-absolute d-flex flex-column p-3 gap-3">
            <Link href="/saved" className="text-decoration-none accountdropdown__link">
                Saved
            </Link>
            <Link href="/login" className="text-decoration-none accountdropdown__link">
                {/*Get Session*/}
                Logout
            </Link>
        </div>
    )
}

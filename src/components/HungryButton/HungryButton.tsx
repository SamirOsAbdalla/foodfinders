import React from 'react'
import "./HungryButton.css"
import Link from 'next/link'
export default function HungryButton() {
    return (
        <Link href="/" className="hungry-button text-decoration-none">
            I&apos;m hungry
        </Link>
    )
}

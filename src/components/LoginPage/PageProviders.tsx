import React from 'react'
import { PageType } from './LoginPage'

interface Props {
    pageType: PageType
}
export default function PageProviders({
    pageType
}: Props) {
    return (
        <div className="page-providers__wrapper d-flex flex-column align-items-center">
            <div className="page-providers__or text-align-center">OR</div>
            <button>{pageType == "signin" ? "Login" : "Register"} with Google </button>
        </div>
    )
}

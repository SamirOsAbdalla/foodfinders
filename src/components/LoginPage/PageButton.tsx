import React from 'react'
import { PageType } from './LoginPage'

interface Props {
    pageType: PageType
}
export default function PageButton({
    pageType
}: Props) {
    return (
        <button className="login-page__button--main" type="submit">
            {pageType == "signin" ? "Login" : "Register"}
        </button>
    )
}

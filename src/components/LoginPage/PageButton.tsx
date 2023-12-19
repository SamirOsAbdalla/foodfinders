import React from 'react'
import { PageType } from './LoginPage'
import LoadingSpinner from './LoadingSpinner'

interface Props {
    pageType: PageType,
    loading: boolean
}
export default function PageButton({
    pageType,
    loading
}: Props) {

    let renderedText = pageType == "signin" ? "Login" : "Register"
    return (
        <button className="login-page__button--main" type="submit">
            {!loading ? renderedText : <LoadingSpinner />}
        </button>
    )
}

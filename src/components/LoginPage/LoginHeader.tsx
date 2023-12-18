
import React from 'react'
import { PageType } from './LoginPage'

interface Props {
    pageType: PageType
}
export default function LoginHeader({
    pageType
}: Props) {
    return (
        <h1 className="login-page__header">
            {pageType == "signin" ? "Welcome Back" : "Register to Continue"}
        </h1>
    )
}

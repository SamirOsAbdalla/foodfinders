

import React from 'react'
import "./LoginPage.css"
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import PageSwitch from './PageSwitch'
import PageProviders from './PageProviders'

export type PageType = "signin" | "register"

interface Props {
    pageType: PageType
}
export default function LoginPage({
    pageType
}: Props) {

    return (
        <section className="login-page__wrapper d-flex justify-content-between">
            <div className="login-page__main d-flex flex-column align-items-center">
                <LoginHeader
                    pageType={pageType}
                />
                <LoginForm
                    pageType={pageType}
                />
                <PageProviders
                    pageType={pageType}
                />
                <PageSwitch
                    pageType={pageType}
                />

            </div>
            <div className="login-page__image--container">
                <div className="login-page__image">

                </div>
            </div>
        </section>
    )
}

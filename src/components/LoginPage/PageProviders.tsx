"use client"
import React from 'react'
import { PageType } from './LoginPage'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

interface Props {
    pageType: PageType
}
export default function PageProviders({
    pageType
}: Props) {

    const clickHandler = async () => {
        await signIn("google")
    }
    return (
        <div className="page-providers__wrapper d-flex flex-column align-items-center">
            <div className="page-providers__or text-align-center">OR</div>
            <button onClick={clickHandler} className="form-error__button position-relative d-flex w-100 justify-content-center align-items-center">
                <div className="google-image__container position-absolute">
                    <Image src={"https://uploads.divjoy.com/icon-google.svg"} fill alt="Google Image" />
                </div>
                {pageType == "signin" ? "Login" : "Register"} with Google
            </button>
        </div>
    )
}

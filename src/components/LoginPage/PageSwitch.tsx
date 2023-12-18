import React from 'react'
import { PageType } from './LoginPage'
import Link from 'next/link'

interface Props {
    pageType: PageType
}

export default function PageSwitch({
    pageType
}: Props) {
    return (
        <div className="page-switch__wrapper d-flex justify-content-center align-items-center gap-2">
            <span>
                {pageType == "signin" ?
                    "Need an account?" :
                    "Already have an account?"
                }
            </span>
            <Link href={`${pageType == "signin" ? "/register" : "/signIn"}`}>
                {pageType == "signin" ?
                    "Create account" :
                    "Login"
                }
            </Link>
        </div>
    )
}

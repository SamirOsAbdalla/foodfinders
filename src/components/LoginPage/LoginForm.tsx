"use client"
import React from 'react'
import { useState } from 'react'
import PageInput from './PageInput'
import { PageType } from './LoginPage'
import PageButton from './PageButton'

interface Props {
    pageType: PageType
}
export default function LoginForm({
    pageType
}: Props) {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application / json"
                },
                body: JSON.stringify(user)
            })

            if (res.status == 400) {
                //set email register error
            } else if (res.status == 500) {

            }
            else if (res.status == 200) {
                //handle success

            }
        } catch (err: any) {
            //set error
        }
    }


    return (
        <form onSubmit={handleSubmit} className="login-form d-flex flex-column justify-content-center gap-4">
            <PageInput
                type="email"
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <PageInput
                type="password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
            />
            <PageButton
                pageType={pageType}
            />
        </form>
    )
}

"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import PageInput from './PageInput'
import { PageType } from './LoginPage'
import PageButton from './PageButton'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'
import FormError from './FormError'

interface Props {
    pageType: PageType
}
export default function LoginForm({
    pageType
}: Props) {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const session = useSession()
    const router = useRouter()


    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/")
        }
    }, [session, router])

    const handleRegistration = async (user: { email: string, password: string }) => {

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application / json"
            },
            body: JSON.stringify(user)
        })
        const resJSON = await res.json()


        enableButton()
        setLoading(false)
        if (res.status != 200) {
            setError(resJSON)
        } else {

            handleLogin(user)
        }
    }

    const handleLogin = async ({ email, password }: { email: string, password: string }) => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if (res?.error) {
            setError(res.error)
        } else {
            setError("")
            if (res?.url) {
                enableButton()
                setLoading(false)
                router.replace("/")
            }
        }
        enableButton()
        setLoading(false)
    }

    const disableButton = () => {
        const pageButton = document.querySelector(".login-page__button--main") as HTMLButtonElement
        pageButton.disabled = true
    }

    const enableButton = () => {
        const pageButton = document.querySelector(".login-page__button--main") as HTMLButtonElement
        pageButton.disabled = false
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        disableButton()
        const user = {
            email,
            password
        }

        if (pageType == "register") {
            handleRegistration(user)
        } else {
            handleLogin(user)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="login-form d-flex flex-column justify-content-center gap-4">
            {error && <FormError message={error} />}
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
                loading={loading}
                pageType={pageType}
            />
        </form>
    )
}

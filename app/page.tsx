"use client"

import { useQuery } from "@tanstack/react-query"
import { useCorbadoSession } from "@corbado/react"
import Link from "next/link"

interface UserData {
    email: string
    secretNote: string
}

// This logic could also be executed server-side as long as cookies are used to manage the session.
export default function Home() {
    const { user, shortSession, loading } = useCorbadoSession()

    const { data, isLoading, isError } = useQuery<UserData | null>({
        queryKey: ["user-data", shortSession],
        queryFn: fetchUserData,
    })

    async function fetchUserData() {
        if (!shortSession || !user) {
            return null
        }
        const response = await fetch("/user-data", {
            method: "GET",
            headers: {
                Authorization: `Basic ${shortSession}`,
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error("Backend response was not ok")
        }
        return await response.json()
    }
    if (isLoading || loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                <p>There was an error fetching your data.</p>
            </div>
        )
    }
    if (data) {
        return (
            <div>
                <h1>Hello {data.email}</h1>
                <h2>Here is your secret note:</h2>
                <p>{data.secretNote}</p>
                <Link href='/profile'>Take a look at your profile</Link>
            </div>
        )
    }
    return (
        <div>
            <p>You&apos;re not authenticated</p>
            <p>
                You can go to authentication <Link href='/auth'>here.</Link>
            </p>
        </div>
    )
}

"use client"

import { CorbadoAuth } from "@corbado/react"
import { useRouter } from "next/navigation"

export default function Auth() {

    const router = useRouter()
    const onLoggedIn = () => {
        router.push("/profile")
    }

    return (
        <div>
            <CorbadoAuth onLoggedIn={onLoggedIn} />
        </div>
    )
}
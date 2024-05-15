"use client"

import { useCorbado } from "@corbado/react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const { logout } = useCorbado()
    const router = useRouter()

    const onLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <button onClick={onLogout}>Logout</button>
    )
}
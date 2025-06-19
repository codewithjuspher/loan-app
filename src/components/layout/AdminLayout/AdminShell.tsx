
import { Outlet } from "@tanstack/react-router"
import { useEffect } from "react"
import { parse } from "cookie"
import { useAuthStore } from "../../../stores/authStore"
import { AdminLayout } from "./AdminLayout"

export function AdminShell() {
    const setToken = useAuthStore((s) => s.setAccessToken)

    useEffect(() => {
        const cookieString = document.cookie
        const parsed = parse(cookieString)
        const token = parsed["access_token"]
        setToken(token ?? null)
    }, [setToken])

    return <AdminLayout><Outlet /></AdminLayout>
}
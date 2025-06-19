import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import { authGuard } from "../../lib/guards/authGuard"

function DashboardPage() {
  return React.createElement("div", null, "Admin Dashboard goes here")
}

export const Route = createFileRoute("/admin/dashboard")({
  loader: ({ location }) => {
    authGuard(location.pathname)
    return null
  },
  component: DashboardPage,
})

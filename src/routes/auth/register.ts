import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import { PublicLayout } from "../../components/layout/PublicLayout"
import { AuthPage } from "../../pages/Auth"

function LoginPage() {
  return React.createElement(PublicLayout, null, React.createElement(AuthPage))
}

export const Route = createFileRoute("/auth/register")({
  component: LoginPage,
})
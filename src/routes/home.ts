import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import Home from "../pages/Home"
import { PublicLayout } from "../components/layout/PublicLayout/PublicLayout"

function HomePage() {
  return React.createElement(PublicLayout, null, React.createElement(Home))
}

export const Route = createFileRoute("/home")({
  component: HomePage,
})

import { createFileRoute } from "@tanstack/react-router"
import React from "react"
import AboutUs from "../pages/About"
import { PublicLayout } from "../components/layout/PublicLayout/PublicLayout"

function AboutPage() {
  return React.createElement(PublicLayout, null, React.createElement(AboutUs))
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
})
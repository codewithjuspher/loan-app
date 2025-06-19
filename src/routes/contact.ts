import { createFileRoute } from "@tanstack/react-router"
import React from "react"

import { PublicLayout } from "../components/layout/PublicLayout/PublicLayout"
import ContactUsPage from "../pages/Contact"

function ContactPage() {
  return React.createElement(PublicLayout, null, React.createElement(ContactUsPage))
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
})
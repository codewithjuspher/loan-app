import { createRootRoute } from "@tanstack/react-router";
import React from "react";
import { NotFound } from "../components/layout/NotFound";

function NotFoundPage() {
    return React.createElement("div", null, React.createElement(NotFound))
}

export const Route = createRootRoute({
    notFoundComponent: NotFoundPage
});

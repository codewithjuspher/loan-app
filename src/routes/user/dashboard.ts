import { createFileRoute, redirect } from "@tanstack/react-router";
import React from "react";
import { authGuard } from "../../lib/guards/authGuard";
import { logout } from "../../lib/auth/logout";

function DashboardPage() {
  return React.createElement(
    "main",
    {
      style: {
        padding: "3rem",
        maxWidth: "960px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
        color: "#1f2937",
      },
    },
    React.createElement(
      "header",
      null,
      React.createElement("h1", {
        style: {
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "1rem",
        },
        children: "Welcome to Your Dashboard",
      }),
      React.createElement("p", {
        style: {
          fontSize: "1rem",
          color: "#6b7280",
        },
        children: "Manage your funds, contributions, and settings from here.",
      })
    ),
    React.createElement(
      "section",
      { style: { marginTop: "2rem" } },
      React.createElement(
        "button",
        {
          onClick: logout,
          onMouseOver: (e: React.MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.backgroundColor = "#b91c1c"),
          onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.backgroundColor = "#dc2626"),
          style: {
            padding: "0.75rem 1.5rem",
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          },
          "aria-label": "Logout",
        },
        "Logout"
      )
    )
  );
}


export const Route = createFileRoute("/user/dashboard")({
  loader: async ({ location }) => {
    authGuard(location.pathname);

    const res = await fetch("/me");
    const user = (await res.json()) as { fund?: unknown; wallet?: unknown };

    if (!user.fund && !user.wallet) {
      throw redirect({ to: "/fund/onboarding" });
    }

    return null;
  },
  component: DashboardPage,
});

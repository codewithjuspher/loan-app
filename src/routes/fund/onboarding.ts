import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { logout } from "../../lib/auth/logout";

function FundOnboardingPage() {
  return React.createElement(
    "main",
    {
      style: {
        padding: "3rem",
        maxWidth: "720px",
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
        color: "#1f2937",
      },
    },
    React.createElement(
      "section",
      null,
      React.createElement("h1", {
        style: {
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "1rem",
        },
        children: "Let's Get You Started",
      }),
      React.createElement("p", {
        style: {
          fontSize: "1rem",
          lineHeight: 1.6,
          color: "#4b5563",
          marginBottom: "2rem",
        },
        children:
          "It looks like you don’t have a fund yet. Join an existing fund or create a new one to start saving and collaborating with others.",
      }),
      React.createElement(
        "div",
        { style: { display: "flex", gap: "1rem" } },
        React.createElement(
          "button",
          {
            style: {
              padding: "0.75rem 1.5rem",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            },
            onClick: () => alert("Redirect to create fund"),
          },
          "Create a Fund"
        ),
        React.createElement(
          "button",
          {
            style: {
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6b7280",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            },
            onClick: () => alert("Redirect to join fund"),
          },
          "Join a Fund"
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
      )
    )
  );
}

export const Route = createFileRoute("/fund/onboarding")({
  component: FundOnboardingPage,
});

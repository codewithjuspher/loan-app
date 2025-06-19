import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAccessToken } from "../../lib/auth/getAccessToken";
import React from "react";
import { PublicLayout } from "../../components/layout/PublicLayout";
import { AuthPage } from "../../pages/Auth";

function LoginPage() {
  return React.createElement(PublicLayout, null, React.createElement(AuthPage));
}

export const Route = createFileRoute("/auth/login")({
  loader: () => {
    const token = getAccessToken();
    if (token) {
      throw redirect({ to: "/user/dashboard" });
    }
    return null;
  },
  component: LoginPage,
});

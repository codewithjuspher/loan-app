import { redirect } from "@tanstack/react-router";
import { getAccessToken } from "../auth/getAccessToken";

export function authGuard(currentPath: string) {
    const token = getAccessToken();

    if (!token) {
        throw redirect({
            to: "/auth/login",
            search: { redirectTo: currentPath },
        });
    }

    return token;
}

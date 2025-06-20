import { clearCurrentUser } from "../../mocks/session";

export function logout() {
    clearCurrentUser();
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
    window.location.href = "/auth/login";
}

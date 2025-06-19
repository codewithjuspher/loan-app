export function getAccessToken(): string | null {
    const cookieString = document.cookie;
    const cookies = Object.fromEntries(
        cookieString.split("; ").map(cookie => {
            const [key, ...v] = cookie.split("=");
            return [key, v.join("=")];
        })
    );

    return cookies["access_token"] || null;
}

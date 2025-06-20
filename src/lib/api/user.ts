export interface User {
    id: number;
    name: string;
    fund?: unknown;
    wallet?: unknown;
}

export async function getUser(): Promise<User> {
    const res = await fetch("/me");

    const contentType = res.headers.get("Content-Type");

    if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status}`);
    }

    if (!contentType?.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Expected JSON, got: ${text.slice(0, 100)}`);
    }

    const data = (await res.json()) as unknown;

    if (
        typeof data === "object" &&
        data !== null &&
        "id" in data &&
        "name" in data
    ) {
        return data as User;
    }

    throw new Error("Invalid user data received");
}

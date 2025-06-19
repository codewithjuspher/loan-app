export async function enableMocks() {
    if (import.meta.env.VITE_APP_ENVIRONMENT === "development") {
        const { worker } = await import("./browser");
        await worker.start({
            onUnhandledRequest: "bypass",
        });
    }
}

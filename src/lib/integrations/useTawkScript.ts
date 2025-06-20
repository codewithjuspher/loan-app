import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export const useTawkScript = () => {
    const { location } = useRouterState();
    const pathname = location.pathname;

    useEffect(() => {
        const publicPaths = ["/home", "/about", "/contact"];
        const shouldLoad = publicPaths.includes(pathname);

        if (!shouldLoad) {
            const existing = document.querySelector('script[src*="tawk.to"]');
            if (existing) {
                existing.remove();
            }
            return;
        }

        if (document.querySelector('script[src*="tawk.to"]')) return;

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://embed.tawk.to/68536f2db912651914220c10/1iu2ukikf";
        script.setAttribute("crossorigin", "*");

        document.body.appendChild(script);

        return () => {
            const tawk = document.querySelector('script[src*="tawk.to"]');
            if (tawk) tawk.remove();
        };
    }, [pathname]);
};

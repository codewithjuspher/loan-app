import { useEffect, useRef } from "react";
import { useUIStore } from "../stores/uiStore";

export function useAutoDarkMode() {
    const { setDarkMode, autoDarkMode } = useUIStore();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!autoDarkMode) return;

        const updateMode = () => {
            const hour = new Date().getHours();
            const isNight = hour >= 18 || hour < 6;
            setDarkMode(isNight);
        };

        const getMsUntilNextSwitch = () => {
            const now = new Date();
            const next = new Date(now);

            if (now.getHours() < 6) next.setHours(6, 0, 0, 0);
            else if (now.getHours() < 18) next.setHours(18, 0, 0, 0);
            else {
                next.setDate(next.getDate() + 1);
                next.setHours(6, 0, 0, 0);
            }

            return next.getTime() - now.getTime();
        };

        updateMode();

        const scheduleNext = () => {
            const timeout = setTimeout(() => {
                updateMode();
                scheduleNext();
            }, getMsUntilNextSwitch());

            timerRef.current = timeout;
        };

        scheduleNext();

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [autoDarkMode, setDarkMode]);
}

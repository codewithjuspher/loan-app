import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";

type UIState = {
    darkMode: boolean;
    autoDarkMode: boolean;
    language: "en" | "fil" | "es" | "ja";
    setDarkMode: (value: boolean) => void;
    setAutoDarkMode: (enabled: boolean) => void;
    setLanguage: (lang: "en" | "fil" | "es" | "ja") => void;
};

const getInitialDarkMode = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
};

export const useUIStore = createWithEqualityFn<UIState>()(
    persist(
        (set) => ({
            darkMode: getInitialDarkMode(),
            autoDarkMode: true,
            language: "en",
            setDarkMode: (value) => set({ darkMode: value }),
            setAutoDarkMode: (enabled) => set({ autoDarkMode: enabled }),
            setLanguage: (lang) => set({ language: lang }),
        }),
        {
            name: "ui-preferences",
            onRehydrateStorage: () => (state) => {
                if (state?.darkMode === undefined) {
                    state?.setDarkMode(getInitialDarkMode());
                }
            },
        }
    )
);

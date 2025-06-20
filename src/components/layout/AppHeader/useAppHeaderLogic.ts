import { useTranslation } from "react-i18next";
import { useUIStore } from "../../../stores/uiStore";
import { useRouterState, useRouter } from "@tanstack/react-router";
import { shallow } from "zustand/shallow";
import i18n from "../../../common/i18n";
import { Grid } from "antd";

const { useBreakpoint } = Grid
export const useAppHeaderLogic = () => {
    const { autoDarkMode, setAutoDarkMode, darkMode, setDarkMode, language, setLanguage } = useUIStore(
        (state) => ({
            autoDarkMode: state.autoDarkMode,
            setAutoDarkMode: state.setAutoDarkMode,
            darkMode: state.darkMode,
            setDarkMode: state.setDarkMode,
            language: state.language,
            setLanguage: state.setLanguage,
        }),
        shallow
    );

    const router = useRouter();
    const { location } = useRouterState();
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const { t } = useTranslation("header");

    const supportedLanguages = ["en", "fil", "es", "ja"] as const;
    type Language = (typeof supportedLanguages)[number];

    const handleLanguageChange = (value: string) => {
        if (supportedLanguages.includes(value as Language)) {
            const lang = value as Language;
            setLanguage(lang);
            i18n.changeLanguage(lang);
        }
    };

    const handleLogin = () => {
        router.navigate({ to: "/auth/login" });
    };

    return {
        autoDarkMode,
        setAutoDarkMode,
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        location,
        isMobile,
        t,
        handleLanguageChange,
        handleLogin,
        router,
    };
};


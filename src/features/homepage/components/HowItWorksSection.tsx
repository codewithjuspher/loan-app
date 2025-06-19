import React, { useRef, useEffect } from "react";
import { initHowItWorksAnimations } from "../animations";
import { Card, theme } from "antd";
import { useTranslation } from "react-i18next";

export const HowItWorksSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation("homepage");
    const { token } = theme.useToken();

    useEffect(() => {
        initHowItWorksAnimations(containerRef);
    }, []);

    const steps = t("how.steps", { returnObjects: true }) as {
        title: string;
        description: string;
    }[];

    if (!Array.isArray(steps)) {
        console.warn("how.steps is not an array", steps);
        return null;
    }

    const isDarkMode = token.colorBgBase === "#141414" || token.colorBgBase === "#000";

    return (
        <section
            ref={containerRef}
            className="py-24 px-4 md:px-12 transition-colors duration-700"
            style={{
                background: isDarkMode
                    ? "linear-gradient(to bottom, #0f172a, #1e293b)"
                    : "linear-gradient(to bottom, #eff6ff, #dbeafe)",
                color: token.colorText,
            }}
            id="how-it-works"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">{t("how.title")}</h2>
                <p style={{ color: token.colorTextSecondary }} className="max-w-xl mx-auto">
                    {t("how.description")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {steps.map((step, index) => (
                    <Card
                        key={index}
                        className="rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/30 backdrop-blur-md"
                        style={{
                            backgroundColor: isDarkMode
                                ? "rgba(30, 41, 59, 0.5)"
                                : "rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                        }}
                        title={step.title}
                        styles={{
                            header: {
                                borderBottom: "none",
                                fontWeight: 600,
                                fontSize: "1.125rem",
                                color: token.colorText,
                            },
                            body: {
                                color: token.colorTextSecondary,
                                padding: "1.5rem",
                            },
                        }}
                    >
                        <p>{step.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

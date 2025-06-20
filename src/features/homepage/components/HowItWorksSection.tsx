import React, { useRef, useEffect } from "react"
import { initHowItWorksAnimations } from "../animations"
import { Card, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { useUIStore } from "../../../stores/uiStore"

const { Title, Paragraph } = Typography

export const HowItWorksSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation("homepage")
    const { darkMode } = useUIStore()

    useEffect(() => {
        initHowItWorksAnimations(containerRef)
    }, [])

    const steps = t("how.steps", { returnObjects: true }) as {
        title: string
        description: string
    }[]

    if (!Array.isArray(steps)) {
        console.warn("how.steps is not an array", steps)
        return null
    }

    const isDark = darkMode

    const bgStyle = isDark
        ? "linear-gradient(145deg, rgba(30,41,59,0.5), rgba(67,56,202,0.3))"
        : "linear-gradient(145deg, rgba(255,255,255,0.6), rgba(224,242,254,0.6))"

    return (
        <section
            ref={containerRef}
            className="py-24 px-4 md:px-12 transition-colors duration-700"
            style={{
                background: bgStyle,
                color: isDark ? "#ffffff" : "#1e293b"
            }}
            id="how-it-works"
        >
            <div className="text-center mb-12">
                <Title level={2} style={{ color: isDark ? "#ffffff" : "#1e293b" }}>{t("how.title")}</Title>
                <Paragraph style={{ color: isDark ? "#cbd5e1" : "#475569" }} className="max-w-xl mx-auto">
                    {t("how.description")}
                </Paragraph>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <Card
                        key={index}
                        className="rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/30 backdrop-blur-md"
                        style={{
                            background: bgStyle,
                            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                        }}
                        styles={{
                            header: {
                                borderBottom: "none",
                                fontWeight: 600,
                                fontSize: "1.125rem",
                                color: isDark ? "#ffffff" : "#1e293b",
                            },
                            body: {
                                color: isDark ? "#cbd5e1" : "#475569",
                                padding: "1.5rem",
                            },
                        }}
                        title={<Title level={4} style={{ marginBottom: 0, color: isDark ? "#ffffff" : "#1e293b" }}>{step.title}</Title>}
                    >
                        <Paragraph style={{ color: isDark ? "#cbd5e1" : "#475569" }}>{step.description}</Paragraph>
                    </Card>
                ))}
            </div>
        </section>
    )
}

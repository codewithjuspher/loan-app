import React from "react"
import { Card, Avatar } from "antd"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useUIStore } from "../../../stores/uiStore"

export const TestimonialsSection: React.FC = () => {
    const { darkMode } = useUIStore()
    const { t } = useTranslation("homepage")

    const isDark = darkMode

    const testimonials = [
        {
            name: "Alice Johnson",
            quote: t("testimonials.alice", "Using this sinking fund app helped me save for my house easily!"),
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            name: "Bob Smith",
            quote: t("testimonials.bob", "Great tool for managing financial goals and tracking progress."),
            avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        },
        {
            name: "Cynthia Lee",
            quote: t("testimonials.cynthia", "The UI is intuitive and the reminders keep me on track."),
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            name: "Dan Rivera",
            quote: t("testimonials.dan", "Simple, effective, and powerful savings tracking."),
            avatar: "https://randomuser.me/api/portraits/men/55.jpg",
        },
        {
            name: "Ella Santos",
            quote: t("testimonials.ella", "Love how easy it is to invite friends and build a group fund!"),
            avatar: "https://randomuser.me/api/portraits/women/72.jpg",
        }
    ]

    const duplicated = [...testimonials, ...testimonials]

    const backgroundColor = isDark ? "#0d1117" : "#f0f2f5"
    const primaryText = isDark ? "#ffffff" : "#1f1f1f"
    const secondaryText = isDark ? "#a3adc2" : "#595959"

    const glassStyle = {
        background: isDark ? "rgba(33, 63, 123, 0.4)" : "rgba(255, 255, 255, 0.6)",
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)"
    }

    return (
        <section style={{ backgroundColor, padding: "4rem 1rem", overflow: "hidden" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: primaryText }}>
                    {t("testimonials.title", "What Our Users Say")}
                </h2>
                <p style={{ color: secondaryText }}>
                    {t("testimonials.subtitle", "Real feedback from users reaching their financial goals.")}
                </p>
            </div>

            <motion.div
                style={{
                    display: "flex",
                    gap: "1rem",
                    width: "max-content",
                    animation: "slideLeft 30s linear infinite",
                }}
            >
                {duplicated.map(({ name, quote, avatar }, i) => (
                    <Card
                        key={i}
                        variant="borderless"
                        style={{ minWidth: 280, maxWidth: 320, padding: 24, ...glassStyle }}
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <Avatar src={avatar} size={64} />
                            <h4 style={{ fontWeight: 600, fontSize: "1.125rem", color: primaryText }}>{name}</h4>
                            <p style={{ fontStyle: "italic", color: secondaryText }}>"{quote}"</p>
                        </div>
                    </Card>
                ))}
            </motion.div>

            <style>{`
                @keyframes slideLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    )
}

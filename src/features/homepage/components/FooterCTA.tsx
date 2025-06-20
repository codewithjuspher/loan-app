import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useTranslation } from "react-i18next"
import { Button, Typography } from "antd"
import { useUIStore } from "../../../stores/uiStore"

const { Title, Paragraph } = Typography

gsap.registerPlugin(ScrollTrigger)

export const FooterCTA: React.FC = () => {
    const ctaRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation("homepage")
    const { darkMode } = useUIStore()

    useEffect(() => {
        if (!ctaRef.current) return

        gsap.fromTo(
            ctaRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 85%",
                },
            }
        )
    }, [])

    const bgClass = darkMode
        ? "bg-gradient-to-r from-sky-700 to-sky-500 text-white"
        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"

    return (
        <section ref={ctaRef} className={`py-20 ${bgClass}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Title level={2} className="!text-white !mb-6">
                        {t("footer_cta.title", "Start Building Your Sinking Fund Today")}
                    </Title>
                    <Paragraph className="text-xl mb-8 opacity-90">
                        {t("footer_cta.description", "Join thousands of users who are securing their financial future with our smart sinking fund platform. Whether you're saving for a vacation, home renovation, or new tech gadget, we've got you covered.")}
                    </Paragraph>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            type="default"
                            href="/auth/register"
                            className="!bg-transparent !border-white !text-white hover:!bg-indigo-700 px-8 py-4 rounded-lg shadow-lg font-medium text-lg transition-all cursor-pointer whitespace-nowrap !rounded-button"
                        >
                            {t("footer_cta.primary", "Create Your Account")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
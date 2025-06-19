import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useTranslation } from "react-i18next"
import { Button, Typography } from "antd"

const { Title } = Typography

gsap.registerPlugin(ScrollTrigger)

export const FooterCTA: React.FC = () => {
    const ctaRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation("homepage")

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

    return (
        <section ref={ctaRef} className="bg-sky-600 dark:bg-sky-500 text-white py-8 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <Title
                    level={3}
                    className="!text-white !text-center md:!text-left !mb-0"
                >
                    {t("footer_cta.title", "Ready to start your sinking fund?")}
                </Title>
                <Button
                    type="default"
                    href="/get-started"
                    className="!bg-white !text-sky-600 !font-semibold !py-2 !px-6 !rounded-lg !shadow hover:!bg-gray-100 transition"
                >
                    {t("footer_cta.button", "Get Started")}
                </Button>
            </div>
        </section>
    )
}

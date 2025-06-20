import React from "react"
import { motion, Variants } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useToken } from "antd/es/theme/internal"

const ctaVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 60,
            damping: 12,
        },
    },
}

export const CTASection: React.FC = () => {
    const { t } = useTranslation("homepage")
    const token = useToken()[1]

    const isDark = token.colorBgBase?.includes("#141414") || token.colorBgBase?.includes("rgb(0")

    return (
        <section
            className="py-24 px-4 transition-colors duration-700"
            style={{
                backgroundColor: "#0ea5e9",
            }}
        >
            <motion.div
                className="max-w-4xl mx-auto text-center"
                variants={ctaVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <div className="text-center max-w-3xl mx-auto px-4">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ color: isDark ? "#F1F5F9" : token.colorText }}
                    >
                        {t("cta.title", "Start Building Your Sinking Fund Today")}
                    </h2>
                    <p
                        className="mb-6 text-lg"
                        style={{
                            color: isDark ? "#CBD5E1" : token.colorTextSecondary,
                        }}
                    >
                        {t("cta.description", "Join thousands of users who are securing their financial future with our smart sinking fund platform. Whether you're saving for a vacation, home renovation, or new tech gadget, we've got you covered.")}
                    </p>
                    <a
                        href="/fund/onboarding"
                        className={`inline-block font-semibold py-3 px-6 rounded-xl shadow-md transition
                            ${isDark
                                ? "bg-white text-sky-600 hover:bg-slate-200"
                                : "bg-sky-600 text-white hover:bg-sky-700"}
                        `}
                    >
                        {t("cta.button", "Create Your Fund")}
                    </a>
                </div>

            </motion.div>
        </section>
    )
}


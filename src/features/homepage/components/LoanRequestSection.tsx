import React from "react"
import { motion, Variants } from "framer-motion"
import { useTranslation } from "react-i18next"
import { theme } from "antd"

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
}

export const LoanRequestSection: React.FC = () => {
    const { t } = useTranslation("homepage")
    const { token } = theme.useToken()

    const steps = [
        {
            title: t("loan_request.steps.request", "Request a Loan"),
            description: t("loan_request.steps.request_desc", "Easily submit a loan request directly from your fund dashboard."),
        },
        {
            title: t("loan_request.steps.approval", "Approval Workflow"),
            description: t("loan_request.steps.approval_desc", "Requests are reviewed based on group rules and available balance."),
        },
        {
            title: t("loan_request.steps.receive", "Get Funds Instantly"),
            description: t("loan_request.steps.receive_desc", "Once approved, funds are transferred to your account quickly."),
        },
    ]

    return (
        <section
            className="py-20 px-4 transition-colors duration-700"
            style={{ backgroundColor: token.colorBgBase }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: token.colorText }}
                    >
                        {t("loan_request.title", "Need Extra Help? Request a Loan")}
                    </h2>
                    <p className="mt-3" style={{ color: token.colorTextSecondary }}>
                        {t("loan_request.description", "Our built-in loan request process is simple, transparent, and quick.")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div
                                className="p-6 rounded-2xl shadow-lg backdrop-blur-xl transition-all hover:shadow-2xl"
                                style={{
                                    background: token.colorBgElevated,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                <h3
                                    className="text-xl font-semibold mb-2"
                                    style={{ color: token.colorText }}
                                >
                                    {step.title}
                                </h3>
                                <p style={{ color: token.colorTextSecondary }}>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

import React from "react"
import { motion, Variants } from "framer-motion"
import { Card, Typography } from "antd"
import {
    DollarOutlined,
    FileTextOutlined,
    UsergroupAddOutlined,
    RobotOutlined,
    LineChartOutlined,
    SolutionOutlined,
    TransactionOutlined,
    ClockCircleOutlined,
    BankOutlined
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useUIStore } from "../../../stores/uiStore"

const { Title, Paragraph } = Typography

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut"
        }
    })
}

export const FeaturesSection: React.FC = () => {
    const { t } = useTranslation("homepage")
    const { darkMode } = useUIStore()

    const isDark = darkMode

    const features = [
        {
            icon: <BankOutlined className="text-3xl text-emerald-600" />,
            title: t("features.multiple_currency", "Multiple Currency Support") as string,
            description: t("features.multiple_currency_desc", "Save in USD, EUR, GBP, JPY and more. Seamlessly manage funds across different currencies.") as string
        },
        {
            icon: <FileTextOutlined className="text-3xl text-blue-500" />,
            title: t("features.record", "Record Transactions") as string,
            description: t("features.record_desc", "Easily track every contribution, withdrawal, or expense.") as string
        },
        {
            icon: <DollarOutlined className="text-3xl text-green-500" />,
            title: t("features.contribute", "Contribute Regularly") as string,
            description: t("features.contribute_desc", "Automate or manage your contributions to grow together.") as string
        },
        {
            icon: <UsergroupAddOutlined className="text-3xl text-purple-500" />,
            title: t("features.invite", "Loan & Invite") as string,
            description: t("features.invite_desc", "Access loan features and invite trusted friends.") as string
        },
        {
            icon: <RobotOutlined className="text-3xl text-cyan-500" />,
            title: t("features.ai", "AI Intergration") as string,
            description: t("features.ai_desc", "Get smart assistance for calculations, savings strategies, and automation—all powered by AI.") as string
        },
        {
            icon: <LineChartOutlined className="text-3xl text-orange-500" />,
            title: t("features.goal_tracking", "Goal Tracking") as string,
            description: t("features.goal_tracking_desc", "Set savings targets for each fund and monitor your progress over time.") as string
        },
        {
            icon: <SolutionOutlined className="text-3xl text-pink-500" />,
            title: t("features.group_management", "Group Management") as string,
            description: t("features.group_management_desc", "Create shared funds, assign roles, and manage contributions together.") as string
        },
        {
            icon: <TransactionOutlined className="text-3xl text-yellow-500" />,
            title: t("features.crypto_support", "Crypto Integration") as string,
            description: t("features.crypto_support_desc", "Support for Bitcoin, Ethereum, and other major cryptocurrencies. Store value in digital assets.") as string
        },
        {
            icon: <ClockCircleOutlined className="text-3xl text-indigo-500" />,
            title: t("features.auto_saving", "Automated Savings") as string,
            description: t("features.auto_saving_desc", "Set up recurring transfers to your sinking funds. Never miss a contribution with automation.") as string
        }
    ];

    return (
        <section
            className="py-20 px-4 transition-colors duration-700"
            style={{
                background: isDark
                    ? "linear-gradient(to bottom right, #1e293b, #0f172a)"
                    : "linear-gradient(to bottom right, #ffffff, #e0f2fe)",
                color: isDark ? "#ffffff" : "#1e293b"
            }}
        >
            <div className="max-w-6xl mx-auto text-center mb-12">
                <Title level={2} style={{ color: isDark ? "#ffffff" : "#1e293b" }}>
                    {t("features.title", "Powerful Features for Your Sinking Fund")}
                </Title>
                <Paragraph style={{ color: isDark ? "#cbd5e1" : "#475569" }}>
                    {t("features.description", "Our platform offers everything you need to create, manage, and track your sinking funds for both traditional and cryptocurrency assets.")}
                </Paragraph>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        <Card
                            variant="borderless"
                            className="rounded-2xl shadow-md backdrop-blur-md border border-white/20 dark:border-slate-700/30"
                            style={{
                                background: isDark
                                    ? "linear-gradient(145deg, rgba(30,41,59,0.5), rgba(67,56,202,0.3))"
                                    : "linear-gradient(145deg, rgba(255,255,255,0.6), rgba(224,242,254,0.6))",
                                boxShadow: "0 12px 24px rgba(0,0,0,0.05)",
                            }}
                            styles={{ body: { padding: 24 } }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">{feature.icon}</div>
                                <Title level={4} style={{ color: isDark ? "#ffffff" : "#1e293b" }}>{feature.title}</Title>
                                <Paragraph style={{ color: isDark ? "#cbd5e1" : "#475569" }}>
                                    {feature.description}
                                </Paragraph>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
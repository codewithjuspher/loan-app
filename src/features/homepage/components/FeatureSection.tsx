import React from "react"
import { motion, Variants } from "framer-motion"
import { Card, theme } from "antd"
import {
    DollarOutlined,
    FileTextOutlined,
    UsergroupAddOutlined,
    RobotOutlined,
    LineChartOutlined,
    SolutionOutlined,
    TransactionOutlined
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"

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
    const { token } = theme.useToken()
    const { t } = useTranslation("homepage")

    const isDark = token.colorBgBase === "#141414" || token.colorBgBase?.includes("rgb(0");

    const features = [
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
            title: t("features.ai", "AI Support") as string,
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
            title: t("features.crypto_support", "Cryptocurrency Support") as string,
            description: t("features.crypto_support_desc", "Use popular cryptocurrencies like Bitcoin, Ethereum, Binance, and Solana for secure and modern transactions.") as string
        }
    ];

    return (
        <section
            className="py-20 px-4 transition-colors duration-700"
            style={{
                backgroundColor: token.colorBgBase,
                color: token.colorText
            }}
        >
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                    {t("features.title", "Core Features to Help You Grow")}
                </h2>
                <p className="mt-2" style={{ color: token.colorTextSecondary }}>
                    {t("features.description", "Tools designed to build transparency and financial growth.")}
                </p>
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
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="mt-2" style={{ color: token.colorTextSecondary }}>
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

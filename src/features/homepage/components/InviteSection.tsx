import React, { useEffect, useRef } from "react"
import { initInviteAnimations } from "../animations"
import { Typography, Row, Col, theme } from "antd"
import { GiftOutlined, UserAddOutlined, StarOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { motion, Variants } from "framer-motion"

const { Title, Paragraph } = Typography

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

export const InviteSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { token } = theme.useToken()
    const { t } = useTranslation("homepage")

    useEffect(() => {
        initInviteAnimations(sectionRef)
    }, [])

    const isDark = token.colorBgBase?.includes("#141414") || token.colorBgBase?.includes("rgb(0")

    const cards = [
        {
            icon: <UserAddOutlined style={{ fontSize: 40, color: token.colorPrimary }} />,
            title: t("invite.invite_friends", "Invite Friends"),
            description: t(
                "invite.invite_desc",
                "Send invitations to people you trust and build your group fund together."
            ),
        },
        {
            icon: <GiftOutlined style={{ fontSize: 40, color: token.colorSuccess }} />,
            title: t("invite.earn_rewards", "Earn Rewards"),
            description: t(
                "invite.rewards_desc",
                "Get bonuses or points for every successful invite that joins a fund."
            ),
        },
        {
            icon: <StarOutlined style={{ fontSize: 40, color: token.colorWarning }} />,
            title: t("invite.leaderboard", "Climb the Leaderboard"),
            description: t(
                "invite.leaderboard_desc",
                "Top inviters get a chance to win exclusive prizes each month."
            ),
        },
    ]

    return (
        <section
            ref={sectionRef}
            className="py-20 px-4 transition-colors duration-700"
            style={{ backgroundColor: token.colorBgBase }}
        >
            <div className="max-w-5xl mx-auto text-center mb-12">
                <Title level={2} style={{ color: token.colorText }}>
                    {t("invite.title", "Invite and Win")}
                </Title>
                <Paragraph style={{ color: token.colorTextSecondary }}>
                    {t(
                        "invite.description",
                        "Grow your community and earn rewards for inviting others to join your sinking fund."
                    )}
                </Paragraph>
            </div>

            <Row gutter={[24, 24]} justify="center">
                {cards.map((card, idx) => (
                    <Col xs={24} sm={12} md={8} key={idx}>
                        <motion.div
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            variants={cardVariants}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div
                                className={`p-6 rounded-2xl text-center transition-all duration-500 backdrop-blur-xl
                                    border shadow-lg hover:shadow-xl
                                    ${isDark
                                        ? "bg-gradient-to-br from-slate-800/70 to-slate-700/60 border-white/10 text-white"
                                        : "bg-gradient-to-br from-white/80 to-blue-50/80 border-sky-200/40 text-slate-800"
                                    }
                                `}
                            >
                                <div className="mb-4">{card.icon}</div>
                                <Title level={4} style={{ color: isDark ? "#fff" : "#1e293b" }}>{card.title}</Title>
                                <Paragraph style={{ color: isDark ? "#cbd5e1" : "#475569" }}>
                                    {card.description}
                                </Paragraph>
                            </div>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </section>
    )
}

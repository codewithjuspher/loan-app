import React from "react";
import { Card, Row, Col, Avatar, theme } from "antd";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
};

export const TestimonialsSection: React.FC = () => {
    const { token } = theme.useToken();
    const { t } = useTranslation("homepage");

    const isDark = token.colorBgBase === "#141414" || token.colorBgBase?.includes("rgb(0");

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
    ];

    return (
        <section style={{ backgroundColor: token.colorBgBase, padding: "4rem 1rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: token.colorText }}>
                    {t("testimonials.title", "What Our Users Say")}
                </h2>
                <p style={{ color: token.colorTextSecondary }}>
                    {t("testimonials.subtitle", "Real feedback from users reaching their financial goals.")}
                </p>
            </div>

            <Row gutter={[24, 24]} justify="center" style={{ maxWidth: 1000, margin: "auto" }}>
                {testimonials.map(({ name, quote, avatar }, i) => (
                    <Col key={i} xs={24} sm={12} md={8}>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                            custom={i}
                        >
                            <Card
                                variant="borderless"
                                className="rounded-2xl shadow-md backdrop-blur-md border border-white/20 dark:border-slate-700/30"
                                style={{
                                    background: isDark
                                        ? "rgba(25, 101, 224, 0.4)"
                                        : "rgba(255, 255, 255, 0.6)",
                                    transition: "all 0.4s ease",
                                }}
                                styles={{
                                    body: {
                                        padding: 24,
                                    },
                                }}
                            >
                                <div className="flex flex-col items-center text-center gap-4">
                                    <Avatar src={avatar} size={64} />
                                    <h4 style={{ fontWeight: 600, fontSize: "1.125rem", color: token.colorText }}>
                                        {name}
                                    </h4>
                                    <p
                                        style={{
                                            fontStyle: "italic",
                                            color: token.colorTextSecondary,
                                            fontSize: "0.95rem",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        "{quote}"
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

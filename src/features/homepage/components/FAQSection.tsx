import React from "react";
import { Collapse, theme } from "antd";
import type { CollapseProps } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    QuestionCircleOutlined,
    DollarCircleOutlined,
    LockOutlined,
    RobotOutlined,
    FlagOutlined,
    CreditCardOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

export const FAQSection: React.FC = () => {
    const { t } = useTranslation("homepage");
    const { token } = theme.useToken();

    const iconStyle = {
        color: token.colorPrimary,
        marginRight: 8,
        fontSize: 18,
    };

    const faqItems: CollapseProps["items"] = [
        {
            key: "1",
            label: (
                <span style={{ color: token.colorText }}>
                    <QuestionCircleOutlined style={iconStyle} />
                    {t("faq.q1", "How does a sinking fund work?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a1",
                            "Each member contributes regularly to a shared pool. Funds can be used for loans or shared goals, with transparent tracking and fair rules."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "2",
            label: (
                <span style={{ color: token.colorText }}>
                    <DollarCircleOutlined style={iconStyle} />
                    {t("faq.q2", "Can I request a loan from the group fund?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a2",
                            "Yes. You can request a loan based on your contribution history. Group approval or automated limits may apply."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "3",
            label: (
                <span style={{ color: token.colorText }}>
                    <LockOutlined style={iconStyle} />
                    {t("faq.q3", "Is my contribution secure?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a3",
                            "Your contributions are recorded transparently. Fund administrators or smart contracts manage allocations fairly and securely."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "4",
            label: (
                <span style={{ color: token.colorText }}>
                    <RobotOutlined style={iconStyle} />
                    {t("faq.q4", "Can AI help me plan my savings?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a4",
                            "Yes! Our AI assistant can suggest how much to contribute, remind you of due dates, and even simulate your fund’s growth over time."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "5",
            label: (
                <span style={{ color: token.colorText }}>
                    <FlagOutlined style={iconStyle} />
                    {t("faq.q5", "Can I set a goal for each fund?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a5",
                            "Absolutely. You can set target amounts, deadlines, and even visualize your progress with real-time updates."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "6",
            label: (
                <span style={{ color: token.colorText }}>
                    <CreditCardOutlined style={iconStyle} />
                    {t("faq.q6", "How do I withdraw my savings?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a6",
                            "Withdrawals are based on your share or request type. Some may require admin approval or fund maturity before access."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "7",
            label: (
                <span style={{ color: token.colorText }}>
                    <LockOutlined style={iconStyle} />
                    {t("faq.q7", "How do you keep my transactions safe?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a7",
                            "We use blockchain technology to secure your transactions. It's like a digital lockbox—transparent, tamper-resistant, and built for trust."
                        )}
                    </p>
                </motion.div>
            ),
        },
        {
            key: "8",
            label: (
                <span style={{ color: token.colorText }}>
                    <SafetyCertificateOutlined style={iconStyle} />
                    {t("faq.q8", "What security measures protect my funds?")}
                </span>
            ),
            children: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p style={{ color: token.colorTextSecondary }}>
                        {t(
                            "faq.a8",
                            "Your funds are protected using industry-standard encryption, blockchain transparency, and access controls—ensuring only you and authorized users can access them."
                        )}
                    </p>
                </motion.div>
            ),
        },
    ];

    return (
        <section
            className="py-20 px-4 transition-colors duration-700"
            style={{ backgroundColor: token.colorBgBase }}
        >
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: token.colorText }}
                    >
                        {t("faq.title", "Frequently Asked Questions")}
                    </h2>
                    <p
                        className="mt-3 text-base md:text-lg"
                        style={{ color: token.colorTextSecondary }}
                    >
                        {t("faq.description", "Quick answers to common questions about your sinking fund.")}
                    </p>
                </motion.div>

                <Collapse
                    accordion
                    bordered={false}
                    items={faqItems}
                    style={{
                        background: token.colorBgContainer,
                        borderRadius: token.borderRadiusLG,
                        boxShadow: token.boxShadowTertiary,
                        padding: 16,
                    }}
                />
            </div>
        </section>
    );
};

import React from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.3, duration: 0.6 },
    }),
};

const defaultTexts = {
    mission:
        "Our mission is to empower individuals and employees to save smarter by providing simple, transparent, and community-driven sinking funds.",
    vision:
        "We envision a future where everyone has control over their financial goals through smart saving strategies and trustworthy tools.",
};

export const MissionVision: React.FC = () => {
    const { t } = useTranslation("aboutpage");

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            style={{ marginBottom: 30 }}
        >
            <Title level={3}>
                <UserOutlined style={{ marginRight: 8 }} />
                {t("missionVision", "Mission & Vision")}
            </Title>
            <Paragraph style={{ fontSize: 18, lineHeight: 1.6 }}>
                <Text strong>{t("mission", defaultTexts.mission)}</Text>
            </Paragraph>
            <Paragraph style={{ fontSize: 18, lineHeight: 1.6 }}>
                <Text italic>{t("vision", defaultTexts.vision)}</Text>
            </Paragraph>
        </motion.div>
    );
};

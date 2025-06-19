import React from "react";
import { Typography } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.3, duration: 0.6 },
    }),
};

const defaultValues = [
    {
        name: "Transparency",
        description: "Clear and open tracking of every contribution and withdrawal.",
    },
    {
        name: "Community",
        description: "Invite trusted friends and grow your funds together.",
    },
    {
        name: "Growth",
        description:
            "Automate contributions and access loan features to build your financial future.",
    },
];

export const CoreValues: React.FC = () => {
    const { t } = useTranslation("aboutpage");

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
            style={{ marginBottom: 30 }}
        >
            <Title level={3}>
                <TeamOutlined style={{ marginRight: 8 }} />
                {t("coreValues", "Core Values")}
            </Title>
            <ul style={{ fontSize: 18, lineHeight: 1.6, paddingLeft: 20 }}>
                {defaultValues.map(({ name, description }, idx) => (
                    <li key={idx} style={{ marginBottom: 12 }}>
                        <strong>{t(`coreValuesList.${idx}.name`, name)}</strong>:{" "}
                        {t(`coreValuesList.${idx}.description`, description)}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};
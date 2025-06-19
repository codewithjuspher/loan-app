import React from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.3, duration: 0.6 },
    }),
};

const defaultTexts = {
    intro:
        "Welcome to Sinking Fund! We make it easy for employees and anyone to create and join sinking funds. Our tools help you easily track every contribution, withdrawal, and expense—so you always know where your money stands.",
    features:
        "Automate your contributions or manage them manually, invite trusted friends to grow together, and even access convenient loan features. Transparency and financial growth are at the heart of everything we build.",
    closing:
        "Join us today and start building your financial future the smart, simple, and friendly way!",
};

export const IntroFeaturesClosing: React.FC = () => {
    const { t } = useTranslation("aboutpage");

    return (
        <>
            {(["intro", "features", "closing"] as const).map((key, i) => (
                <motion.div
                    key={key}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    style={{ marginBottom: 20 }}
                >
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                        {t(key, defaultTexts[key])}
                    </Paragraph>
                </motion.div>
            ))}
        </>
    );
};

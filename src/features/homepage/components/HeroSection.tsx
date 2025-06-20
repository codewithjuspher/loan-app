import React from "react";
import { motion } from "framer-motion";
import { Button, theme } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { circOut } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useUIStore } from "../../../stores/uiStore";

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: circOut,
        },
    },
};

export const HeroSection: React.FC = () => {
    const { t, i18n } = useTranslation("homepage");
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const { darkMode } = useUIStore();
    const primary = token.colorPrimary;

    const backgroundStyle = {
        background: darkMode
            ? "radial-gradient(circle at 20% 30%, rgba(15,23,42,0.85) 0%, rgba(255,255,255,0.15) 25%, rgba(30,41,59,0.6) 50%, rgba(255,255,255,0.1) 65%, rgba(15,23,42,0.7) 80%)"
            : `radial-gradient(circle at 20% 30%, ${primary}, white 40%, ${primary}CC 80%)`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
    };

    return (
        <motion.section
            className="min-h-screen flex items-center px-4"
            style={backgroundStyle}
        >
            <motion.div
                key={i18n.language}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl w-full px-6 md:px-12"
            >
                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight" style={{ color: token.colorText }}>
                        {t("hero.title", "Smart Sinking Fund Management for Traditional & Crypto Assets")}
                    </h1>

                    <p className="text-lg md:text-xl mb-8 max-w-2xl" style={{ color: token.colorTextSecondary }}>
                        {t(
                            "hero.subtitle",
                            "Plan for future expenses by setting aside money regularly. Our platform helps you manage sinking funds across traditional currencies and cryptocurrencies with ease."
                        )}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            type="primary"
                            icon={<ArrowRightOutlined />}
                            size="large"
                            onClick={() => navigate({ to: "/user/dashboard" })}
                        >
                            {t("hero.cta", "Start Saving")}
                        </Button>
                        <Button
                            size="large"
                            ghost
                            onClick={() => navigate({ to: "/" })}
                            style={{
                                color: darkMode ? token.colorText : undefined,
                                borderColor: darkMode ? token.colorText : undefined,
                            }}
                        >
                            {t("hero.learn_more", "Learn More")}
                        </Button>

                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
};

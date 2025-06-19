import React, { useState } from "react";
import { Space, Button } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const CallToActionFunFact: React.FC = () => {
    const { t } = useTranslation("aboutpage");
    const [showFunFact, setShowFunFact] = useState(false);

    return (
        <Space
            direction="vertical"
            size="middle"
            style={{ display: "flex", alignItems: "center", marginBottom: 40 }}
        >
            <Button
                type="primary"
                size="large"
                onClick={() => alert("Get Started!")}
                style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: `0 4px 12px var(--ant-primary-color)`,
                    transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                {t("getStarted", "Get Started")}
            </Button>

            <Button
                type="link"
                onClick={() => setShowFunFact(!showFunFact)}
                style={{ color: "var(--ant-primary-color)" }}
            >
                {showFunFact
                    ? t("hideFunFact", "Hide a fun fact")
                    : t("showFunFact", "Show a fun fact")}
            </Button>

            {showFunFact && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    style={{
                        background: "var(--ant-bg-color-secondary)",
                        padding: "1rem",
                        borderRadius: 8,
                        maxWidth: 600,
                        textAlign: "center",
                        userSelect: "text",
                        fontStyle: "italic",
                    }}
                >
                    {t(
                        "funFact",
                        "Did you know? Sinking funds have been used by savvy savers and businesses for centuries to prepare for future expenses — making your money work smarter, not harder!"
                    )}
                </motion.div>
            )}
        </Space>
    );
};
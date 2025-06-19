import React from "react";
import { motion } from "framer-motion";
import { Button, theme } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { circOut } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SiBitcoin, SiEthereum, SiBinance, SiSolana } from "react-icons/si";
import { useNavigate } from "@tanstack/react-router";

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
    const isDarkMode = token.colorBgBase === "#141414" || token.colorBgBase === "#000"; // fallback check

    return (
        <motion.section
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: isDarkMode
                    ? "linear-gradient(to bottom right, #0f172a, #1e293b, #334155)"
                    : "linear-gradient(to bottom right, #1e3a8a, #2563eb, #3b82f6)",
            }}
        >
            <motion.div
                key={i18n.language}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative max-w-2xl w-full px-8 py-12 text-center rounded-3xl border border-white/20 dark:border-slate-700/30 backdrop-blur-lg shadow-xl transition-colors duration-500"
                style={{
                    backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.4)" : "rgba(255, 255, 255, 0.2)",
                    color: token.colorText,
                    boxShadow:
                        "0 20px 40px rgba(0,0,0,0.25), inset 0 0 0.5px rgba(255,255,255,0.1)",
                }}
            >
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-2xl z-[-1]" />

                <h1
                    className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight"
                    style={{ color: token.colorText }}
                >
                    {t("hero.title", "Join a Sinking Fund and Secure Your Future")}
                </h1>

                <p
                    className="text-lg md:text-xl mb-4"
                    style={{ color: token.colorTextSecondary }}
                >
                    {t("hero.subtitle", "Contribute, manage, and grow your community savings — all in one place.")}
                </p>

                <div className="flex flex-col items-center justify-center mb-6 gap-4 sm:gap-6 text-4xl sm:text-5xl md:text-6xl">
                    <div className="flex items-center justify-center gap-4 text-5xl">
                        <SiBitcoin className="text-[#f7931a] dark:text-[#f7931a]" />
                        <SiEthereum className="text-[#3c3c3d] dark:text-[#8c8c8c]" />
                        <SiBinance className="text-[#f0b90b] dark:text-[#f0b90b]" />
                        <SiSolana className="text-[#00ffa3] dark:text-[#9945ff]" />
                    </div>
                    <p
                        className="text-sm md:text-base mb-4 italic"
                        style={{ color: token.colorTextSecondary }}
                    >
                        {t(
                            "hero.cryptoNote",
                            "Now with upcoming support for cryptocurrency transactions, including Bitcoin, Ethereum, Binance, and Solana."
                        )}
                    </p>
                </div>
                <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    size="large"
                    className="px-8 py-2 font-semibold shadow-md"
                    onClick={() => navigate({ to: "/user/dashboard" })}
                >
                    {t("hero.cta", "Get Started")}
                </Button>
            </motion.div>
        </motion.section>
    );
};

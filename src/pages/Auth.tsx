import React from "react";
import { Card, theme } from "antd";
import { useLocation } from "@tanstack/react-router";
import { LoginForm } from "../features/auth/login/components/LoginForm";
import { ForgotPasswordForm } from "../features/auth/login/components/ForgotPasswordForm";
import { RegistrationForm } from "../features/auth/registration/components/RegistrationForm";
import { AnimatePresence, motion } from "framer-motion";

export const AuthPage: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { token } = theme.useToken();
    const isRegister = pathname.endsWith("/register");
    const isForgot = pathname.endsWith("/forgot-password");

    let content;
    let key;

    if (isForgot) {
        content = <ForgotPasswordForm />;
        key = "forgot";
    } else if (isRegister) {
        content = <RegistrationForm />;
        key = "register";
    } else {
        content = <LoginForm />;
        key = "login";
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: token.colorBgLayout,
                padding: "2rem",
            }}
        >
            <Card
                variant="borderless"
                style={{
                    width: "100%",
                    maxWidth: 880,
                    borderRadius: 16,
                    boxShadow: `0 8px 24px ${token.colorBorderSecondary}`,
                    background: token.colorBgContainer,
                    overflow: "hidden",
                }}
                styles={{ body: { padding: "2rem" } }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {content}
                    </motion.div>
                </AnimatePresence>
            </Card>
        </div>
    );
};

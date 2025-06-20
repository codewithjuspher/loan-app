import React from "react";
import { SmartButton } from "../../../ui/Button/Button";
import { LoginOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useRouterState, useRouter } from "@tanstack/react-router";

interface Props {
    isMobile: boolean;
}

export const LoginButton: React.FC<Props> = ({ isMobile }) => {
    const { navigate } = useRouter();
    const { location } = useRouterState();
    const { t } = useTranslation("header");
    const isLoginPage = location.pathname.startsWith("/auth/login");

    return (
        <div style={{ marginTop: isMobile ? 24 : 0, textAlign: "center" }}>
            <SmartButton
                mode="submit"
                type={isLoginPage ? "primary" : "default"}
                onClick={() => navigate({ to: "/auth/login" })}
                icon={<LoginOutlined />}
                label={t("actions.login")}
            />
        </div>
    );
};

import React from "react";
import { Result, Button } from "antd";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = () => {
    const { t } = useTranslation("common");

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                padding: "2rem",
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle={t("not_found.subtitle", "Sorry, the page you visited does not exist.")}
                extra={
                    <Button type="primary">
                        <Link to="/home">{t("not_found.back_home", "Back Home")}</Link>
                    </Button>
                }
            />
        </div>
    );
};

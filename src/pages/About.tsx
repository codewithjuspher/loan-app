import React from "react";
import { Typography, theme, Divider, FloatButton } from "antd";
import { useTranslation } from "react-i18next";

import { IntroFeaturesClosing, MissionVision, CoreValues, Team, CallToActionFunFact } from "../features/aboutpage/components";

const { Title } = Typography;

export const AboutUs: React.FC = () => {
    const { t } = useTranslation("aboutpage");
    const { token } = theme.useToken();

    return (
        <div
            style={{
                margin: "3rem auto",
                padding: "0 3rem",
                color: token.colorText,
                userSelect: "none",
            }}
        >
            <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
                {t("title", "About Sinking Fund")}
            </Title>

            <IntroFeaturesClosing />
            <Divider />
            <MissionVision />
            <CoreValues />
            <Team />
            <Divider />
            <CallToActionFunFact />

            
			<FloatButton.BackTop visibilityHeight={200} style={{ bottom: 100, right: 20 }} />
        </div>
    );
};

export default AboutUs;

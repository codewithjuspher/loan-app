import React from "react";
import { Space, Switch, Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { FlickeringBulb } from "./FlickeringBulb";
import { useAppHeaderLogic } from "../useAppHeaderLogic";

interface Props {
    isMobile: boolean;
}

export const HeaderControls: React.FC<Props> = ({ isMobile }) => {
    const {
        autoDarkMode,
        setAutoDarkMode,
        darkMode,
        setDarkMode,
        language,
        handleLanguageChange,
        t,
    } = useAppHeaderLogic();

    return (
        <Space
            size="middle"
            align="center"
            style={{
                marginTop: isMobile ? 24 : 0,
                width: isMobile ? "100%" : "auto",
                justifyContent: isMobile ? "space-around" : "flex-start",
                display: "flex",
            }}
        >
            <Space>
                <FlickeringBulb />
                <Switch
                    checked={autoDarkMode}
                    onChange={setAutoDarkMode}
                    checkedChildren={t("theme.auto")}
                    unCheckedChildren={t("theme.manual")}
                />
                {!autoDarkMode && (
                    <Switch
                        checked={darkMode}
                        onChange={setDarkMode}
                        checkedChildren="🌙"
                        unCheckedChildren="☀️"
                    />
                )}
            </Space>

            <Space>
                <GlobalOutlined />
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    style={{ width: 100 }}
                    size="small"
                    variant="borderless"
                >
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="fil">Filipino</Select.Option>
                    <Select.Option value="es">Español</Select.Option>
                    <Select.Option value="ja">日本語</Select.Option>
                </Select>
            </Space>
        </Space>
    );
};

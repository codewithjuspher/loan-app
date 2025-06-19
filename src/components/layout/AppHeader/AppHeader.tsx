import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Layout,
    Menu,
    Switch,
    Select,
    Drawer,
    Grid,
    Space,
    theme
} from "antd"
import {
    MenuOutlined,
    LoginOutlined,
    GlobalOutlined,
} from "@ant-design/icons"
import { Link, useRouterState } from "@tanstack/react-router"
import { useUIStore } from "../../../stores/uiStore"
import i18n from "../../../common/i18n"
import { SmartButton } from "../../ui/Button/Button"
import logo from "../../../assets/images/logo-transparent.png";
import { useRouter } from "@tanstack/react-router";
import { shallow } from "zustand/shallow";
import { FlickeringBulb } from "./FlickeringBulb"

const { Header } = Layout
const { useBreakpoint } = Grid

export const AppHeader: React.FC = () => {
    const { autoDarkMode, setAutoDarkMode, darkMode, language, setLanguage } = useUIStore(
        (state) => ({
            autoDarkMode: state.autoDarkMode,
            setAutoDarkMode: state.setAutoDarkMode,
            darkMode: state.darkMode,
            language: state.language,
            setLanguage: state.setLanguage,
        }),
        shallow
    );
    const { location } = useRouterState()
    const { navigate } = useRouter();
    const [drawerVisible, setDrawerVisible] = useState(false)
    const screens = useBreakpoint()
    const isMobile = !screens.md
    const { token } = theme.useToken()
    const { t } = useTranslation("header")

    const supportedLanguages = ["en", "fil", "es", "ja"] as const;
    type Language = (typeof supportedLanguages)[number];

    const handleLanguageChange = (value: string) => {
        if (supportedLanguages.includes(value as Language)) {
            const lang = value as Language;
            setLanguage(lang);
            i18n.changeLanguage(lang);
        }
    }

    const handleLogin = () => {
        navigate({ to: "/auth/login" });
    }

    useEffect(() => {
        document.body.setAttribute("data-theme", darkMode ? "dark" : "light")
    }, [darkMode])

    const menuItems = [
        { key: "/home", label: <Link to="/home">{t("navigation.home")}</Link> },
        { key: "/about", label: <Link to="/about">{t("navigation.about")}</Link> },
        { key: "/contact", label: <Link to="/contact">{t("navigation.contact")}</Link> },
    ]

    const isLoginPage = location.pathname.startsWith("/auth/login");

    const renderLoginButton = (
        <div style={{ marginTop: isMobile ? 24 : 0, textAlign: "center" }}>
            <SmartButton
                mode="submit"
                type={isLoginPage ? "primary" : "default"}
                onClick={handleLogin}
                icon={<LoginOutlined />}
                label={t("actions.login")}
            />
        </div>
    );

    const renderControls = (
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
                        onChange={(value) => useUIStore.getState().setDarkMode(value)}
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

    return (
        <Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: token.colorBgContainer,
                paddingInline: 24,
                height: 64,
                boxShadow: token.boxShadowSecondary,
                zIndex: 1000,
                position: "sticky",
                top: 0,
            }}
        >
            <Link to="/home">
                <img
                    src={logo}
                    alt="Sinking Fund Logo"
                    style={{ height: 90, objectFit: "contain" }}
                />
            </Link>

            {isMobile ? (
                <>
                    <MenuOutlined
                        aria-label="Open navigation menu"
                        style={{ fontSize: 24 }}
                        onClick={() => setDrawerVisible(true)}
                    />

                    <Drawer
                        title={t("navigation.menu")}
                        placement="right"
                        onClose={() => setDrawerVisible(false)}
                        open={drawerVisible}
                        styles={{ body: { background: token.colorBgContainer } }}
                    >
                        <Menu
                            mode="vertical"
                            selectedKeys={[location.pathname]}
                            items={menuItems}
                            onClick={() => setDrawerVisible(false)}
                        />
                        {renderControls}
                        {renderLoginButton}
                    </Drawer>
                </>
            ) : (
                <>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            display: "flex",
                            borderBottom: "none",
                            background: token.colorBgContainer,
                        }}
                    />
                    {renderControls}
                    {renderLoginButton}
                </>
            )}

        </Header>
    )
}

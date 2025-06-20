import React, { useEffect, useState } from "react";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Drawer, Layout, theme, Typography, Dropdown } from "antd";
import { motion, AnimatePresence } from "framer-motion";

import { HeaderControls } from "./Controls/HeaderControls";
import { LoginButton } from "./Controls/LoginButton";
import { useAppHeaderLogic } from "./useAppHeaderLogic";
import { useUIStore } from "../../../stores/uiStore";

const { Header } = Layout;
const { Title } = Typography;

const AnimatedDropdownMenu: React.FC<{
    items: { key: string; label: React.ReactNode }[];
    columns?: number;
    darkMode: boolean;
}> = ({ items, columns = 2, darkMode }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`
                    ${darkMode ? "bg-slate-800" : "bg-white"}
                    shadow-lg rounded-xl py-4 px-6
                    grid gap-4
                    ${columns === 2 ? "grid-cols-2" : `grid-cols-${columns}`}
                    min-w-[280px]`}
            >
                {items.map((item) => (
                    <a
                        key={item.key}
                        href="#"
                        className={`text-sm transition hover:text-blue-600 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                    >
                        {item.label}
                    </a>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};

const renderDropdown = (
    label: string,
    items: { key: string; label: React.ReactNode }[],
    darkMode: boolean,
    columns?: number
) => (
    <Dropdown
        popupRender={() => (
            <AnimatedDropdownMenu items={items} columns={columns} darkMode={darkMode} />
        )}
        trigger={["hover"]}
        placement="bottom"
        arrow
    >
        <span className="cursor-pointer px-4 py-2 hover:text-blue-600 transition duration-300 ease-in-out flex items-center gap-1">
            {label} <DownOutlined style={{ fontSize: 10 }} />
        </span>
    </Dropdown>

);

export const AppHeader: React.FC = () => {
    const { location, isMobile, t } = useAppHeaderLogic();
    const { darkMode } = useUIStore();

    useEffect(() => {
        document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const { token } = theme.useToken();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const userGuideItems = [
        { key: "overview", label: t("header.user_guide.overview", "Overview") },
        { key: "setup", label: t("header.user_guide.setup", "Setup") },
        { key: "faq", label: t("header.user_guide.faq", "FAQ") },
        { key: "security", label: t("header.user_guide.security", "Security") },
        { key: "privacy", label: t("header.user_guide.privacy", "Privacy") },
        { key: "billing", label: t("header.user_guide.billing", "Billing") },
        { key: "loans", label: t("header.user_guide.loans", "Loans") },
        { key: "payments", label: t("header.user_guide.payments", "Payments") },
        { key: "funds", label: t("header.user_guide.funds", "Funds") },
        { key: "transactions", label: t("header.user_guide.transactions", "Transactions") },
        { key: "rewards", label: t("header.user_guide.rewards", "Rewards") },
        { key: "withdrawal", label: t("header.user_guide.withdrawal", "Withdrawal") },
    ];

    const servicesItems = [
        { key: "wallet", label: t("header.services.wallet", "Wallet") },
        { key: "crypto", label: t("header.services.crypto", "Crypto") },
        { key: "insurance", label: t("header.services.insurance", "Insurance") },
        { key: "investments", label: t("header.services.investments", "Investments") },
    ];

    const navLinkClass = (path: string) =>
        `flex items-center gap-1 px-4 py-2 transition ${location.pathname === path ? "text-blue-600 font-medium" : darkMode ? "text-gray-200" : "text-gray-800"
        } hover:text-blue-600`;

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
            <Link to="/home" className="inline-block">
                <Title
                    level={3}
                    className="!m-0 text-blue-600 dark:text-blue-400 font-semibold tracking-tight"
                >
                    SinkFund.io
                </Title>
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
                        <div className="flex flex-col gap-4">
                            <Link to="/home" className={navLinkClass("/home")}>{t("navigation.home", "Home")}</Link>
                            {renderDropdown(t("navigation.user_guide", "User Guide"), userGuideItems, darkMode, 2)}
                            {renderDropdown(t("navigation.services", "Services"), servicesItems, darkMode, 2)}
                            <a href="#" className={navLinkClass("/careers")}>{t("navigation.careers", "Careers")}</a>
                            <a href="#" className={navLinkClass("/stories")}>{t("navigation.stories", "Stories")}</a>
                            <Link to="/contact" className={navLinkClass("/contact")}>{t("navigation.contact", "Contact")}</Link>
                            <HeaderControls isMobile />
                            <LoginButton isMobile />
                        </div>
                    </Drawer>
                </>
            ) : (
                <div className="flex items-center gap-6">
                    <Link to="/home" className={navLinkClass("/home")}>{t("navigation.home", "Home")}</Link>
                    {renderDropdown(t("navigation.user_guide", "User Guide"), userGuideItems, darkMode, 2)}
                    {renderDropdown(t("navigation.services", "Services"), servicesItems, darkMode, 2)}
                    <a href="#" className={navLinkClass("/careers")}>{t("navigation.careers", "Careers")}</a>
                    <a href="#" className={navLinkClass("/stories")}>{t("navigation.stories", "Stories")}</a>
                    <Link to="/contact" className={navLinkClass("/contact")}>{t("navigation.contact", "Contact")}</Link>
                    <HeaderControls isMobile={false} />
                    <LoginButton isMobile={false} />
                </div>
            )}
        </Header>
    );
};

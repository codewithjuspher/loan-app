import React from "react"
import {
    Layout,
    Typography,
    Row,
    Col,
    Space
} from "antd"
import {
    FacebookFilled,
    LinkedinFilled,
    TwitterSquareFilled,
    InstagramFilled
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useUIStore } from "../../../stores/uiStore"

const { Footer } = Layout
const { Title, Text, Link } = Typography

export const AppFooter: React.FC = () => {
    const { darkMode } = useUIStore()
    const { t } = useTranslation("footer")
    const createdYear = 2025
    const currentYear = new Date().getFullYear()
    const displayYear = createdYear === currentYear ? `${createdYear}` : `${createdYear} - ${currentYear}`

    const footerColumns = [
        {
            title: t("brand", "FundSink"),
            description: t("description", "The smart way to manage your sinking funds across traditional and cryptocurrency assets."),
            social: true
        },
        {
            title: t("services.title", "Services"),
            links: [
                t("services.wallet", "Wallet"),
                t("services.crypto", "Crypto"),
                t("services.insurance", "Insurance"),
                t("services.investment", "Investment")
            ]
        },
        {
            title: t("resources.title", "Resources"),
            links: [
                t("resources.helpCenter", "Help Center"),
                t("resources.guides", "Guides"),
                t("resources.community", "Community"),
                t("resources.webinars", "Webinars")
            ]
        },
        {
            title: t("company.title", "Company"),
            links: [
                t("company.stories", "Stories"),
                t("company.careers", "Careers"),
                t("company.contact", "Contact"),
                t("company.partners", "Partners")
            ]
        }
    ]

    const textColor = darkMode ? "#e5e7eb" : "#374151"
    const secondaryTextColor = darkMode ? "#94a3b8" : "#6b7280"
    const bgColor = darkMode ? "#0f172a" : "#f9fafb"
    const borderColor = darkMode ? "#1e293b" : "#e5e7eb"

    return (
        <Footer style={{ background: bgColor, padding: "64px 32px 32px" }}>
            <Row gutter={[32, 32]} justify="center">
                {footerColumns.map((col, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Title level={4} style={{ color: textColor }}>{col.title}</Title>
                        {typeof col.description === "string" && (
                            <>
                                <Text style={{ color: secondaryTextColor, display: "block", marginBottom: 12 }}>{col.description}</Text>
                                {col.social && (
                                    <Space size="middle" style={{ marginTop: 0 }}>
                                        <a href="#" aria-label="Twitter"><TwitterSquareFilled style={{ fontSize: 20, color: secondaryTextColor }} /></a>
                                        <a href="#" aria-label="Facebook"><FacebookFilled style={{ fontSize: 20, color: secondaryTextColor }} /></a>
                                        <a href="#" aria-label="Instagram"><InstagramFilled style={{ fontSize: 20, color: secondaryTextColor }} /></a>
                                        <a href="#" aria-label="LinkedIn"><LinkedinFilled style={{ fontSize: 20, color: secondaryTextColor }} /></a>
                                    </Space>
                                )}
                            </>
                        )}
                        {col.links && (
                            <Space direction="vertical" size="small" style={{ marginTop: 12 }}>
                                {col.links.map((link, idx) => (
                                    <Link key={idx} href="#" style={{ color: secondaryTextColor }}>{link}</Link>
                                ))}
                            </Space>
                        )}
                    </Col>
                ))}
            </Row>

            <div className="mt-16 pt-8 border-t" style={{ borderColor }}>
                <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Space direction="vertical" size={2}>
                            <Text style={{ color: secondaryTextColor, fontSize: 14 }}>
                                &copy; {displayYear} FundSink. {t("rightsReserved", "All rights reserved.")}
                            </Text>
                        </Space>
                    </Col>

                    <Col xs={24} md={12} style={{ textAlign: "right" }}>
                        <Space direction="vertical" size={16} style={{ width: "100%" }}>
                            <Space size="middle" wrap>
                                <Link href="#" style={{ color: secondaryTextColor }}>{t("terms", "Terms of Service")}</Link>
                                <Link href="#" style={{ color: secondaryTextColor }}>{t("privacy", "Privacy Policy")}</Link>
                                <Link href="#" style={{ color: secondaryTextColor }}>{t("cookie", "Cookie Policy")}</Link>
                            </Space>
                            <Space size="middle" wrap>
                                <a href="#" aria-label="Download on App Store">
                                    <img
                                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                        alt={t("appStore", "Download on the App Store")}
                                        style={{ height: 40 }}
                                    />
                                </a>
                                <a href="#" aria-label="Get it on Google Play">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                        alt={t("googlePlay", "Get it on Google Play")}
                                        style={{ height: 40 }}
                                    />
                                </a>
                                <a href="#" aria-label="Explore it on App Gallery">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Huawei_AppGallery_white_badge_EN.png"
                                        alt={t("appGallery", "Explore it on App Gallery")}
                                        style={{ height: 40 }}
                                    />
                                </a>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Footer>
    )
}

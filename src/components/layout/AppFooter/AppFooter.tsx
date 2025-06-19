import React from "react"
import { Layout, Space, Typography, theme, Row, Col, Grid } from "antd"
import {
    FacebookFilled,
    LinkedinFilled,
    TwitterSquareFilled,
    InstagramFilled,
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"

const { Footer } = Layout
const { Text } = Typography
const { useBreakpoint } = Grid

export const AppFooter: React.FC = () => {
    const { token } = theme.useToken()
    const { t } = useTranslation("footer")
    const screens = useBreakpoint()
    const createdYear = 2025;
    const currentYear = new Date().getFullYear();
    const displayYear = createdYear === currentYear ? `${createdYear}` : `${createdYear} - ${currentYear}`;

    return (
        <Footer
            style={{
                background: token.colorBgContainer,
                padding: "24px 32px",
            }}
        >
            <Row gutter={[16, 16]} justify="space-between" align="top">
                {!screens.xs && (
                    <Col xs={0} md={12}>
                        <Space direction="vertical" size="small">
                            <Typography.Link href="#about" style={{ color: token.colorTextSecondary }}>
                                {t("footer.about_us")}
                            </Typography.Link>
                            <Typography.Link href="#contact" style={{ color: token.colorTextSecondary }}>
                                {t("footer.contact")}
                            </Typography.Link>
                            <Typography.Link href="#privacy" style={{ color: token.colorTextSecondary }}>
                                {t("footer.privacy_policy")}
                            </Typography.Link>
                            <Typography.Link href="#terms" style={{ color: token.colorTextSecondary }}>
                                {t("footer.terms_of_service")}
                            </Typography.Link>
                        </Space>
                    </Col>
                )}

                <Col xs={24} md={12} style={{ textAlign: screens.xs ? "left" : "right" }}>
                    <Space
                        direction="vertical"
                        size="small"
                        align={screens.xs ? "start" : "end"}
                        style={{ width: "100%" }}
                    >
                        {!screens.xs && <Text strong>{t("footer.follow_us")}</Text>}
                        <Space size="middle">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FacebookFilled style={{ fontSize: 24 }} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedinFilled style={{ fontSize: 24 }} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <TwitterSquareFilled style={{ fontSize: 24 }} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <InstagramFilled style={{ fontSize: 24 }} />
                            </a>
                        </Space>

                        <div style={{ marginTop: 4 }}>
                            <Text type="secondary" style={{ fontSize: 14, display: "block" }}>
                                {t("footer.copyright", {
                                    year: displayYear,
                                    name: "SINKING FUND",
                                })}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
                                {t("footer.rights")}
                            </Text>
                        </div>
                    </Space>
                </Col>
            </Row>
        </Footer>
    )
}

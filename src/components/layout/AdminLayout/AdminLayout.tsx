import React, { useState } from "react"
import { Layout, theme } from "antd"

const { Header, Content } = Layout
import { AppFooter } from "../AppFooter"
import { AppSidebar } from "../AppSidebar"

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppSidebar collapsed={collapsed} onCollapse={setCollapsed} />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: "16px" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    )
}
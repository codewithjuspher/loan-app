import React from "react"
import { Layout } from "antd"
import { AppHeader } from "../AppHeader"
import { AppFooter } from "../AppFooter"

const { Content } = Layout

type Props = {
    children: React.ReactNode
}

export const PublicLayout: React.FC<Props> = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />
            <Content>
                <div style={{ margin: "0 auto" }}>{children}</div>
            </Content>
            <AppFooter />
        </Layout>
    )
}
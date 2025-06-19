import { Menu, Layout } from "antd"
import {
    PieChartOutlined,
    DesktopOutlined,
    TeamOutlined,
    UserOutlined,
    FileOutlined,
} from "@ant-design/icons"
import React from "react"

const { Sider } = Layout

const items = [
    { key: "1", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "2", icon: <DesktopOutlined />, label: "Workspace" },
    {
        key: "3",
        icon: <UserOutlined />,
        label: "Users",
        children: [
            { key: "4", label: "Tom" },
            { key: "5", label: "Bill" },
        ],
    },
    { key: "6", icon: <TeamOutlined />, label: "Teams" },
    { key: "7", icon: <FileOutlined />, label: "Files" },
]

export const AppSidebar: React.FC<{
    collapsed: boolean
    onCollapse: (collapsed: boolean) => void
}> = ({ collapsed, onCollapse }) => {
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" items={items} defaultSelectedKeys={["1"]} />
        </Sider>
    )
}
import React from "react";
import { Card, Avatar, Row, Col, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.3, duration: 0.6 },
    }),
};

const teamMembers = [
    { name: "Juspher Balangyao", role: "Founder & CEO" },
    { name: "Rhea Jane Lisondra", role: "Product Manager" },
];

export const Team: React.FC = () => {
    const { t } = useTranslation("aboutpage");

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
            style={{ marginBottom: 30 }}
        >
            <Title level={3}>{t("teamTitle", "Meet the Team")}</Title>
            <Row gutter={[24, 24]} justify="center">
                {teamMembers.map(({ name, role }, i) => (
                    <Col key={i} xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            style={{ textAlign: "center", borderRadius: 12 }}
                            styles={{
                                body: {
                                    padding: 20,
                                },
                            }}
                        >
                            <Avatar size={80} icon={<UserOutlined />} style={{ marginBottom: 12 }} />
                            <Title level={5} style={{ marginBottom: 4 }}>
                                {name}
                            </Title>
                            <Text type="secondary">{role}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </motion.div>
    );
};

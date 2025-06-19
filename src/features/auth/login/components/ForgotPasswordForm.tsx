import React, { useMemo, useState } from "react";
import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    Alert,
    theme,
} from "antd";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { createForgotPasswordSchema, ForgotPasswordFormData } from "../schema/forgotPasswordSchema";

const { Title, Text } = Typography;

export const ForgotPasswordForm: React.FC = () => {
    const { t } = useTranslation("auth");
    const { token } = theme.useToken();
    const [submitted, setSubmitted] = useState(false);
    const schema = useMemo(() => createForgotPasswordSchema(t), [t]);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        console.log("Forgot password request:", data);
        setSubmitted(true);
        setTimeout(() => {
            reset();
        }, 1000);
    };

    return (
        <div style={{ maxWidth: 480, margin: "4rem auto", padding: "0 1rem" }}>
            <Card
                variant="borderless"
                style={{
                    borderRadius: 12,
                    boxShadow: token.boxShadowTertiary,
                    background: token.colorBgContainer,
                }}
            >
                <Title level={3} style={{ textAlign: "center" }}>
                    {t("forgot.title", "Forgot Password")}
                </Title>

                {submitted && (
                    <Alert
                        message={t(
                            "forgot.success",
                            "If the email is registered, a reset link has been sent."
                        )}
                        type="success"
                        showIcon
                        closable
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item
                        label={t("forgot.email", "Email")}
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    prefix={<MailOutlined />}
                                    placeholder={t("forgot.email_placeholder", "Enter your email")}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {t("forgot.send_link", "Send Reset Link")}
                        </Button>
                    </Form.Item>

                    <Text style={{ display: "block", textAlign: "center" }}>
                        <a href="/auth/login">{t("forgot.back_to_login", "Back to Login")}</a>
                    </Text>
                </Form>
            </Card>
        </div>
    );
};

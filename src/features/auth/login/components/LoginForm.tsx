import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Form, Input, Button, Divider, Typography, Space, theme, notification } from "antd";
import { FacebookFilled, GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { create } from "zustand";
import { useTranslation } from "react-i18next";
import { createLoginSchema, LoginFormData } from "../schema/loginSchema";

const { Title, Text } = Typography;

type AuthState = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};
const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));

export const LoginForm: React.FC = () => {
    const { token } = theme.useToken();
    const { loading, setLoading } = useAuthStore();
    const { t } = useTranslation<"auth">("auth");
    const schema = useMemo(() => createLoginSchema(t), [t]);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        mode: "onTouched"
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        try {
            const res = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = (await res.json()) as {
                access_token?: string;
                user?: {
                    id: number;
                    name: string;
                    fund?: boolean;
                    wallet?: boolean;
                };
            };

            if (result.access_token) {
                document.cookie = `access_token=${result.access_token}; path=/; SameSite=Lax`;

                window.location.href = "/user/dashboard";
            } else {
                notification.error({
                    message: t("messages.auth_failed", "Authentication Failed"),
                    description: t("messages.invalid_credentials", "Invalid username or password"),
                    duration: 3,
                    placement: "topRight",
                });
            }
        } catch (err) {
            console.error("Login failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        notification.warning({
            message: t("messages.coming_soon_title", "Coming Soon"),
            description: t("messages.social_not_ready", { provider }),
            duration: 3,
            placement: "topRight",
        });

    };

    return (
        <div className="max-w-[480px] mx-auto my-12 px-4 sm:my-16 sm:px-6">
            <Card
                variant="borderless"
                style={{
                    borderRadius: 12,
                    boxShadow: token.boxShadowTertiary,
                    background: token.colorBgContainer,
                }}
            >
                <Title level={3} style={{ textAlign: "center" }}>
                    {t("login.title", "Login to Your Account")}
                </Title>

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} requiredMark={false}>
                    <Form.Item
                        label={t("login.username_or_mobile", "Username or Mobile")}
                        validateStatus={errors.identifier ? "error" : ""}
                        help={errors.identifier?.message}
                    >
                        <Controller
                            name="identifier"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    prefix={<UserOutlined />}
                                    placeholder={t("login.username_or_mobile_placeholder", "Enter username or mobile")}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("login.password", "Password")}
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input.Password
                                    {...field}
                                    prefix={<LockOutlined />}
                                    placeholder={t("login.password_placeholder", "Enter password")}
                                />
                            )}
                        />
                    </Form.Item>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                        <a href="/auth/forgot-password">
                            {t("login.forgot", "Forgot Password?")}
                        </a>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            {t("login.button", "Login")}
                        </Button>
                    </Form.Item>
                </Form>

                <Divider>{t("login.or", "Or continue with")}</Divider>

                <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                        icon={<FacebookFilled />}
                        style={{ backgroundColor: "#1877F2", color: "#fff" }}
                        block
                        onClick={() => handleSocialLogin("Facebook")}
                    >
                        {t("login.facebook", "Continue with Facebook")}
                    </Button>
                    <Button
                        icon={<GoogleOutlined />}
                        style={{ backgroundColor: "#fff", color: "#000", borderColor: "#ccc" }}
                        block
                        onClick={() => handleSocialLogin("Google")}
                    >
                        {t("login.google", "Continue with Google")}
                    </Button>
                </Space>

                <Divider />

                <Text style={{ display: "block", textAlign: "center" }}>
                    {t("login.no_account", "Don't have an account?")}{" "}
                    <a href="/auth/register">{t("login.register", "Register here")}</a>
                </Text>
            </Card>
        </div>
    );
};

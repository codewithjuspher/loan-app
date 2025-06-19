import React, { useMemo } from "react";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
    Form,
    Input,
    Button,
    Typography,
    Card,
    theme,
    Alert,
    Progress,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRegistrationSchema, RegistrationFormData } from "../schema/registrationSchema";
import { useTranslation } from "react-i18next";
import zxcvbn from "zxcvbn";

const { Title } = Typography;

const getPasswordStrength = (password: string) => {
    const score = zxcvbn(password).score;
    switch (score) {
        case 0: return { label: "too weak", color: "#ff4d4f", percent: 20 };
        case 1: return { label: "weak", color: "#fa8c16", percent: 40 };
        case 2: return { label: "fair", color: "#faad14", percent: 60 };
        case 3: return { label: "strong", color: "#1890ff", percent: 80 };
        case 4: return { label: "very strong", color: "#52c41a", percent: 100 };
        default: return { label: "", color: "#d9d9d9", percent: 0 };
    }
};

export const RegistrationForm: React.FC = () => {
    const { token } = theme.useToken();
    const { t } = useTranslation("auth");
    const schema = useMemo(() => createRegistrationSchema(t), [t]);
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    const password = watch("password");
    const passwordStrength = getPasswordStrength(password || "");

    const onSubmit = (data: RegistrationFormData) => {
        console.log("Registration data:", data);
        setTimeout(() => {
            reset();
        }, 1500);
    };

    return (
        <div style={{ maxWidth: 580, margin: "2rem auto", padding: "0 1rem" }}>
            <Card
                variant="borderless"
                title={
                    <Title level={3} style={{ textAlign: "center", margin: 0 }}>
                        {t("register.title")}
                    </Title>
                }
                style={{
                    borderRadius: 12,
                    boxShadow: `0 4px 20px ${token.colorBorderSecondary}`,
                    background: token.colorBgContainer,
                }}
            >
                {isSubmitSuccessful && (
                    <Alert
                        type="success"
                        message={t("messages.success_register")}
                        showIcon
                        closable
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item
                        label={t("register.full_name")}
                        validateStatus={errors.fullName ? "error" : ""}
                        help={errors.fullName?.message}
                    >
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Juan Dela Cruz" />}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("register.username")}
                        validateStatus={errors.username ? "error" : ""}
                        help={errors.username?.message}
                    >
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="username123" />}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("register.email")}
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="you@example.com" />}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("register.mobile")}
                        validateStatus={errors.mobile ? "error" : ""}
                        help={errors.mobile?.message}
                    >
                        <Controller
                            name="mobile"
                            control={control}
                            rules={{
                                required: t("messages.required"),
                                validate: (value) =>
                                    isValidPhoneNumber(value || "") || t("messages.invalid_mobile"),
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="+63 912 345 6789"
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("register.password")}
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Input.Password {...field} placeholder={t("register.password")} />
                                    {field.value && (
                                        <div>
                                            <Progress
                                                percent={passwordStrength.percent}
                                                showInfo={false}
                                                strokeColor={passwordStrength.color}
                                                strokeWidth={4}
                                            />
                                            <div style={{ color: passwordStrength.color, fontSize: 12 }}>
                                                {t(`password_strength.${passwordStrength.label}`, passwordStrength.label)}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("register.confirm_password")}
                        validateStatus={errors.confirmPassword ? "error" : ""}
                        help={errors.confirmPassword?.message}
                    >
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Input.Password {...field} placeholder={t("register.confirm_password")} />
                                    {field.value && (
                                        <div
                                            style={{
                                                color: field.value === password ? "green" : "red",
                                                fontSize: 12,
                                                marginTop: 4,
                                            }}
                                        >
                                            {field.value === password
                                                ? t("register.passwords_match")
                                                : t("register.passwords_do_not_match")}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {t("register.submit")}
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
                        <span style={{ color: token.colorTextSecondary }}>
                            {t("register.already_have")}{" "}
                        </span>
                        <Button type="link" href="/auth/login" style={{ padding: 0 }}>
                            {t("register.login")}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
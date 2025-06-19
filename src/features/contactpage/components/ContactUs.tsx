import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    Input,
    Button,
    Typography,
    Alert,
    Card,
    theme,
    Select,
} from "antd";

import { useTranslation } from "react-i18next";
import { ContactFormData, createContactSchema } from "../schemas/contactSchema";
import { useContactStore } from "../../../stores/contactStore";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const ContactUs: React.FC = () => {
    const { loading, success, setLoading, setSuccess } = useContactStore();
    const { token } = theme.useToken();
    const { t } = useTranslation("contactpage");
    const schema = useMemo(() => createContactSchema(t), [t]);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(schema),
        mode: "onTouched",
        defaultValues: { honeypot: "" },
    });

    const onSubmit = (data: ContactFormData) => {
        if (data.honeypot) {
            console.warn("Bot submission detected");
            return;
        }
        setLoading(true);
        setSuccess(false);
        console.log("Contact Form Data:", data);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            reset();
        }, 1500);
    };

    return (
        <div style={{ maxWidth: 640, margin: "3rem auto", padding: "0 1rem" }}>
            <Card
                title={
                    <Title level={3} style={{ margin: 0, textAlign: "center" }}>
                        {t("contact.title")}
                    </Title>
                }
                styles={{ body: { padding: 24 } }}
                style={{
                    borderRadius: 12,
                    boxShadow: `0 8px 24px ${token.colorBgContainer}`,
                    background: token.colorBgContainer,
                }}
            >
                {success && (
                    <Alert
                        message={t("contact.success")}
                        type="success"
                        showIcon
                        closable
                        style={{ marginBottom: 20 }}
                        onClose={() => setSuccess(false)}
                    />
                )}

                <Form
                    layout="vertical"
                    onFinish={handleSubmit(onSubmit)}
                    requiredMark={false}
                >
                    <Form.Item
                        label={t("contact.name")}
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name?.message}
                        required
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder={t("contact.placeholder.name")} />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("contact.email")}
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                        required
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder={t("contact.placeholder.email")} />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("contact.phone")}
                        validateStatus={errors.phone ? "error" : ""}
                        help={errors.phone?.message}
                    >
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <Input {...field} placeholder={t("contact.placeholder.phone")} />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("contact.subject")}
                        validateStatus={errors.subject ? "error" : ""}
                        help={errors.subject?.message}
                        required
                    >
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder={t("contact.placeholder.subject")}
                                >
                                    <Option value="support">{t("contact.subjects.support")}</Option>
                                    <Option value="feedback">{t("contact.subjects.feedback")}</Option>
                                    <Option value="feature">{t("contact.subjects.feature")}</Option>
                                    <Option value="other">{t("contact.subjects.other")}</Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label={t("contact.message")}
                        validateStatus={errors.message ? "error" : ""}
                        help={errors.message?.message}
                        required
                    >
                        <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                                <TextArea {...field} rows={5} placeholder={t("contact.placeholder.message")} />
                            )}
                        />
                    </Form.Item>

                    <Form.Item hidden>
                        <Controller
                            name="honeypot"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    autoComplete="off"
                                    tabIndex={-1}
                                    style={{ display: "none" }}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            {t("contact.submit")}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

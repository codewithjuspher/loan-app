import { z } from "zod";
import type { TFunction } from "i18next";

export const createContactSchema = (t: TFunction<"contactpage">) =>
    z.object({
        name: z
            .string({
                required_error: t("contact.errors.name_required", "Name is required"),
            })
            .min(2, {
                message: t("contact.errors.name_required", "Name is required"),
            }),

        email: z
            .string({
                required_error: t("contact.errors.email_required", "Email is required"),
            })
            .email({
                message: t("contact.errors.email_invalid", "Invalid email address"),
            }),

        phone: z.string().optional(),

        subject: z
            .string({
                required_error: t("contact.errors.subject_required", "Subject is required"),
            })
            .min(1, {
                message: t("contact.errors.subject_required", "Please select a subject"),
            }),

        message: z
            .string({
                required_error: t("contact.errors.message_required", "Message is required"),
            })
            .min(10, {
                message: t("contact.errors.message_min", "Message must be at least 10 characters"),
            }),

        honeypot: z
            .string()
            .max(0, {
                message: t("contact.errors.spam_detected", "Spam detected"),
            }),
    });

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

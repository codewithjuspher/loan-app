import { z } from "zod";
import type { TFunction } from "i18next";

export const createForgotPasswordSchema = (t: TFunction<"auth">) =>
    z.object({
        email: z
            .string({
                required_error: t("forgot.errors.email_required", "Email is required"),
            })
            .email({
                message: t("forgot.errors.email_invalid", "Invalid email address"),
            }),
    });

export type ForgotPasswordFormData = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

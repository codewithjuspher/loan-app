import { z } from "zod";
import type { TFunction } from "i18next";

export const createLoginSchema = (t: TFunction<"auth">) =>
    z.object({
        identifier: z
            .string({
                required_error: t("login.errors.identifier_required", "Username or mobile is required"),
            })
            .min(4, {
                message: t("login.errors.identifier_required", "Username or mobile is required"),
            }),
        password: z
            .string({
                required_error: t("login.errors.password_required", "Password is required"),
            })
            .min(6, {
                message: t("login.errors.password_min", "Password must be at least 6 characters"),
            }),
    });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

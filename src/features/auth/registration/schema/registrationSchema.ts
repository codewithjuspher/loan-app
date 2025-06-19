import { z } from "zod";
import { TFunction } from "i18next";

export const createRegistrationSchema = (t: TFunction<"auth">) =>
    z
        .object({
            fullName: z
                .string({
                    required_error: t("register.errors.full_name_required", "Full name is required"),
                })
                .min(2, { message: t("register.errors.full_name_required", "Full name is required") })
                .max(50, { message: t("register.errors.full_name_too_long", "Full name is too long") }),

            username: z
                .string({
                    required_error: t("register.errors.username_required", "Username is required"),
                })
                .min(3, { message: t("register.errors.username_min", "Username must be at least 3 characters") })
                .max(20, { message: t("register.errors.username_max", "Username is too long") })
                .regex(/^[a-zA-Z0-9_]+$/, {
                    message: t("register.errors.username_format", "Username can only contain letters, numbers, and underscores"),
                }),

            email: z
                .string({
                    required_error: t("register.errors.email_required", "Email is required"),
                })
                .email({
                    message: t("register.errors.email_invalid", "Invalid email address"),
                }),

            mobile: z
                .string({
                    required_error: t("register.errors.mobile_required", "Mobile number is required"),
                })
                .min(10, { message: t("register.errors.mobile_min", "Mobile number must be at least 10 digits") })
                .max(15, { message: t("register.errors.mobile_max", "Mobile number is too long") })
                .regex(/^\+?[0-9]+$/, {
                    message: t("register.errors.mobile_numeric", "Mobile number must be numeric"),
                }),

            password: z
                .string({
                    required_error: t("register.errors.password_required", "Password is required"),
                })
                .min(6, { message: t("register.errors.password_min", "Password must be at least 6 characters") })
                .max(32, { message: t("register.errors.password_max", "Password is too long") })
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    {
                        message: t(
                            "register.errors.password_format",
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        ),
                    }
                ),

            confirmPassword: z.string({
                required_error: t("register.errors.confirm_password_required", "Confirm password is required"),
            }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("register.errors.passwords_mismatch", "Passwords do not match"),
            path: ["confirmPassword"],
        });

export type RegistrationFormData = z.infer<ReturnType<typeof createRegistrationSchema>>;

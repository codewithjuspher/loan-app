import type { TFunction } from "i18next";

/**
 * A mock translation function that returns the fallback if provided, otherwise the key.
 * Useful for testing or mocking Zod schemas that require translations.
 */
export const mockTFunction = ((key: string, fallback?: string) => {
    return fallback ?? key;
}) as unknown as TFunction<"auth">;

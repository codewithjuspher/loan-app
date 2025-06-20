import { z } from "zod";

export const MarketCoinSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.string().url(),
    current_price: z.number(),
    market_cap: z.number(),
    total_volume: z.number().nullable(),
    price_change_percentage_24h: z.number(),
});

export const MarketCoinArraySchema = z.array(MarketCoinSchema);
export type MarketCoin = z.infer<typeof MarketCoinSchema>;

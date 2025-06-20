import { useEffect, useState } from "react";
import { MarketCoin, MarketCoinArraySchema } from "../features/homepage/schemas/marketCoinSchema";

export const useAllCryptoMarkets = (
    vsCurrency = "php",
    perPage = 100,
    retryKey = 0
) => {
    const [data, setData] = useState<MarketCoin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`
                );

                if (res.status === 429) {
                    throw new Error("Too many requests. Please wait a moment.");
                }

                if (!res.ok) throw new Error("Failed to fetch market data");

                const json = await res.json();
                const parsed = MarketCoinArraySchema.safeParse(json);

                if (parsed.success) {
                    setData(parsed.data);
                    setError(null);
                } else {
                    setError("Invalid data format.");
                }
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Unable to load data.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkets();

        let fetchInterval = setInterval(fetchMarkets, 60000);

        const resetInterval = setInterval(() => {
            clearInterval(fetchInterval);
            fetchInterval = setInterval(fetchMarkets, 60000);
        }, 60 * 60 * 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(resetInterval);
        };
    }, [vsCurrency, perPage, retryKey]);

    return { data, loading, error };
};

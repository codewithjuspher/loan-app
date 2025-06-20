import React, { useEffect, useRef, useState } from "react";
import { Card, Typography, Spin, Select, Button, Result, Row, Col, } from "antd";
import { useAllCryptoMarkets } from "../../../hooks/useAllCryptoMarkets";
import type { MarketCoin } from "../../../features/homepage/schemas/marketCoinSchema";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export const AllCryptoMarketList: React.FC = () => {
    const [currency, setCurrency] = useState<"usd" | "php" | "jpy" | "eur">("usd");
    const [retryKey, setRetryKey] = useState(0);
    const { data, loading, error } = useAllCryptoMarkets(currency, 50, retryKey);
    const containerRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween>();
    const [isHovered, setIsHovered] = useState(false);
    const [displayData, setDisplayData] = useState<MarketCoin[]>([]);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { t } = useTranslation("homepage");

    useEffect(() => {
        setDisplayData(data);
    }, [data]);

    useEffect(() => {
        if (!containerRef.current || !displayData.length) return;

        tweenRef.current?.kill();

        const ctx = gsap.context(() => {
            tweenRef.current = gsap.to(".coin-card", {
                x: `-=${containerRef.current!.scrollWidth / 2}`,
                duration: displayData.length * 2,
                repeat: -1,
                ease: "linear",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [displayData]);

    useEffect(() => {
        if (!tweenRef.current) return;

        if (isHovered) {
            hoverTimeoutRef.current = setTimeout(() => tweenRef.current?.pause(), 500);
        } else {
            hoverTimeoutRef.current = setTimeout(() => tweenRef.current?.resume(), 500);
        }

        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, [isHovered]);

    if (loading) return <Spin size="large" className="block mx-auto my-10" />;

    if (error) {
        return (
            <Result
                status="error"
                title={t("market.errors.title", "Unable to Load Cryptocurrency Market Data")}
                subTitle={t("market.errors.subtitle", "Too many requests. Please try again later.")}
                extra={<Button type="primary" onClick={() => setRetryKey(prev => prev + 1)}>{t("market.reload", "Reload")}</Button>}
            />
        );
    }

    const getCurrencySymbol = (code: string) => {
        switch (code) {
            case "php": return "₱";
            case "jpy": return "¥";
            case "eur": return "€";
            default: return "$";
        }
    };

    return (
        <div className="overflow-hidden py-6">
            <div className="px-4 mb-4">
                <Row justify="center" className="text-center px-4 mb-4">
                    <Col xs={24} sm={20} md={16} lg={12}>
                        <Title level={2}>{t("market.title", "Live Cryptocurrency Market")}</Title>
                        <Paragraph type="secondary" className="mb-2">
                            {t(
                                "market.description",
                                "View real-time price data, volume, and 24h trends of the top cryptocurrencies."
                            )}
                        </Paragraph>
                    </Col>
                </Row>
                <div className="flex justify-end">
                    <Select
                        value={currency}
                        onChange={(val) => setCurrency(val)}
                        style={{ width: 120 }}
                    >
                        <Option value="usd">USD</Option>
                        <Option value="php">PHP</Option>
                        <Option value="jpy">JPY</Option>
                        <Option value="eur">EUR</Option>
                    </Select>
                </div>
            </div>

            <div className="overflow-hidden" ref={containerRef}>
                <div className="flex gap-4 w-fit">
                    <AnimatePresence initial={false}>
                        {displayData.map((coin: MarketCoin) => (
                            <motion.div
                                key={coin.id}
                                className="coin-card"
                                whileHover={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                                style={{ flex: "0 0 auto" }}
                                initial={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card
                                    style={{ width: 240, borderRadius: 12, overflow: "hidden" }}
                                    styles={{ body: { padding: 16 } }}
                                    variant="borderless"
                                    cover={
                                        <div className="flex justify-center items-center p-4">
                                            <img
                                                src={coin.image}
                                                alt={coin.name}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>
                                    }
                                >
                                    <Text strong>{coin.name} ({coin.symbol.toUpperCase()})</Text>
                                    <br />
                                    <Text>
                                        {currency.toUpperCase()}: {getCurrencySymbol(currency)}{coin.current_price.toLocaleString()}
                                    </Text>
                                    <br />
                                    <Text type={coin.price_change_percentage_24h >= 0 ? "success" : "danger"}>
                                        24h: {coin.price_change_percentage_24h.toFixed(2)}%
                                    </Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Volume: {coin.total_volume != null
                                            ? `${getCurrencySymbol(currency)}${coin.total_volume.toLocaleString()}`
                                            : "N/A"}
                                    </Text>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

};
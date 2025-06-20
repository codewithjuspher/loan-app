import React from "react";
import { BankOutlined } from "@ant-design/icons";
import {
    FaDollarSign,
    FaEuroSign,
    FaPoundSign,
    FaYenSign,
    FaBitcoin,
    FaEthereum,
    FaRupeeSign,
    FaCoins
} from "react-icons/fa";

import {
    SiSolana,
    SiCardano,
    SiPolkadot,
    SiChainlink,
    SiBinance,
    SiTether,
    SiDogecoin,
    SiLitecoin,
    SiTon,
} from "react-icons/si";

import { GiMoneyStack } from "react-icons/gi";
import { TbCurrencyRiyal } from "react-icons/tb";
import { useUIStore } from "../../../stores/uiStore";
import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const AssetCard: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
    const { darkMode } = useUIStore();
    return (
        <div
            className={`${darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
                } p-4 rounded-xl shadow-sm flex items-center`}
        >
            <div className="w-10 h-10 bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                {icon}
            </div>
            <Text className="font-medium" type={darkMode ? undefined : "secondary"}>
                {label}
            </Text>
        </div>
    );
};

const AssetCategory: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    items: { icon: React.ReactNode; label: string }[];
}> = ({ title, description, icon, items }) => {
    const { darkMode } = useUIStore();
    const bgClass = darkMode
        ? "bg-gradient-to-br from-slate-800 to-slate-900"
        : title === "Traditional Currencies"
            ? "bg-gradient-to-br from-blue-50 to-indigo-50"
            : "bg-gradient-to-br from-purple-50 to-indigo-50";

    return (
        <div className={`${bgClass} rounded-2xl p-8 shadow-lg`}>
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icon}
                </div>
                <Title level={3} className="!mb-2" style={{ color: darkMode ? "white" : "#1f2937" }}>
                    {title}
                </Title>
                <Paragraph
                    className="!mb-0"
                    style={{
                        color: darkMode ? "rgba(255, 255, 255, 0.8)" : "#4b5563",
                    }}
                >
                    {description}
                </Paragraph>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <AssetCard key={idx} icon={item.icon} label={item.label} />
                ))}
            </div>
        </div>
    );
};

export const AssetIntegrationSection: React.FC = () => {
    const { darkMode } = useUIStore();
    return (
        <section className={`py-20 ${darkMode ? "bg-slate-950" : "bg-white"}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Title
                        level={2}
                        className="!mb-4"
                        style={{ color: darkMode ? "white" : "#111827" }} // gray-900
                    >
                        Integrated Asset Support
                    </Title>
                    <Paragraph
                        className="text-xl max-w-3xl mx-auto"
                        style={{
                            color: darkMode ? "rgba(255, 255, 255, 0.8)" : "#4b5563", // gray-600
                        }}
                    >
                        Our platform supports a wide range of traditional currencies and cryptocurrencies, giving you flexibility in how you save.
                    </Paragraph>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AssetCategory
                        title="Traditional Currencies"
                        description="Save in the world's major fiat currencies"
                        icon={<BankOutlined className="text-2xl text-blue-600" />}
                        items={[
                            { icon: <FaDollarSign className="text-green-600" />, label: "USD" },
                            { icon: <FaEuroSign className="text-indigo-600" />, label: "EUR" },
                            { icon: <FaPoundSign className="text-rose-600" />, label: "GBP" },
                            { icon: <FaYenSign className="text-purple-600" />, label: "JPY" },
                            { icon: <FaDollarSign className="text-cyan-600" />, label: "CAD" },
                            { icon: <FaDollarSign className="text-teal-600" />, label: "AUD" },
                            { icon: <GiMoneyStack className="text-yellow-600" />, label: "PHP" },
                            { icon: <TbCurrencyRiyal className="text-lime-600" />, label: "SAR" },
                            { icon: <FaRupeeSign className="text-orange-600" />, label: "INR" }
                        ]}
                    />

                    <AssetCategory
                        title="Cryptocurrencies"
                        description="Save in leading digital currencies"
                        icon={<FaBitcoin className="text-2xl text-purple-600" />}
                        items={[
                            { icon: <FaBitcoin className="text-orange-500" />, label: "Bitcoin" },
                            { icon: <FaEthereum className="text-gray-700" />, label: "Ethereum" },
                            { icon: <SiSolana className="text-green-400" />, label: "Solana" },
                            { icon: <SiCardano className="text-blue-500" />, label: "Cardano" },
                            { icon: <SiPolkadot className="text-pink-500" />, label: "Polkadot" },
                            { icon: <SiChainlink className="text-blue-600" />, label: "Chainlink" },
                            { icon: <SiBinance className="text-yellow-400" />, label: "Binance Coin" },
                            { icon: <SiTether className="text-emerald-500" />, label: "Tether (USDT)" },
                            { icon: <SiDogecoin className="text-yellow-500" />, label: "Dogecoin" },
                            { icon: <SiLitecoin className="text-gray-400" />, label: "Litecoin" },
                            { icon: <FaCoins className="text-red-500" />, label: "Avalanche" },
                            { icon: <SiTon className="text-red-600" />, label: "TRON" },
                            { icon: <FaCoins className="text-fuchsia-600" />, label: "Uniswap" },
                            { icon: <FaCoins className="text-orange-600" />, label: "Shiba Inu" }
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

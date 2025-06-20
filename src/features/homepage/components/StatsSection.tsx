import { Card } from "antd";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../../stores/uiStore";

type StatCardProps = {
    value: string;
    label: string;
    themeMode: "light" | "dark";
};

const StatCard = ({ value, label, themeMode }: StatCardProps) => {
    const cardBg =
        themeMode === "dark"
            ? "bg-slate-800/40 border-slate-700/40 text-white"
            : "bg-white/60 border-white/30 text-gray-700";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <Card
                variant="borderless"
                className={`
                    ${cardBg}
                    rounded-2xl
                    backdrop-blur-md
                    shadow-xl
                    border
                    p-6
                    text-center
                    transition-all
                    `}>
                <h3 className="text-4xl font-bold text-indigo-600 mb-2">{value}</h3>
                <p className="text-base">{label}</p>
            </Card>
        </motion.div>
    );
};

export const StatsSection = () => {
    const { t } = useTranslation("homepage");
    const { darkMode } = useUIStore();
    const themeMode: "light" | "dark" = darkMode ? "dark" : "light";

    return (
        <section className="mt-16 mb-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                <StatCard
                    value="50,000+"
                    label={t("stats.active_users", "Active Users")}
                    themeMode={themeMode}
                />
                <StatCard
                    value="$120M+"
                    label={t("stats.total_savings", "Total Savings")}
                    themeMode={themeMode}
                />
                <StatCard
                    value="15+"
                    label={t("stats.supported_currencies", "Supported Currencies")}
                    themeMode={themeMode}
                />
            </div>
        </section>
    );
};

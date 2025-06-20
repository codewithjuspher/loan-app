import { motion } from "framer-motion";
import {
    FaUniversity,
    FaCcVisa,
    FaPaypal,
    FaShieldAlt,
    FaBitcoin,
} from "react-icons/fa";
import {
    SiRakuten,
    SiN26,
    SiRevolut,
} from "react-icons/si";

import { useUIStore } from "../../../stores/uiStore";

const brands = [
    { icon: FaUniversity, name: "AlphaBank" },
    { icon: FaCcVisa, name: "Visa" },
    { icon: FaPaypal, name: "PayPal" },
    { icon: FaShieldAlt, name: "SecureFinance" },
    { icon: FaBitcoin, name: "CryptoExchange" },
    { icon: SiRakuten, name: "Rakuten" },
    { icon: SiN26, name: "N26" },
    { icon: SiRevolut, name: "Revolut" },
    { icon: FaUniversity, name: "BDO" },
    { icon: FaUniversity, name: "BPI" },
];

export const TrustedBySection = () => {
    const { darkMode } = useUIStore();
    const themeMode: "light" | "dark" = darkMode ? "dark" : "light";

    const containerStyle =
        themeMode === "dark"
            ? "bg-slate-800/40 border-slate-700/40 text-white"
            : "bg-white/60 border-white/30 text-gray-700";

    return (
        <section className="mt-16 mb-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20">
            <div className="max-w-9xl mx-auto text-center">
                <motion.h3
                    className={`
                        text-xl sm:text-2xl font-semibold mb-10 transition-colors
                        ${darkMode ? "text-white" : "text-gray-900"}
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Trusted By
                </motion.h3>

                <motion.div
                    className={`
                        flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10
                        p-6 rounded-2xl shadow-lg border backdrop-blur-md transition-all
                        ${containerStyle}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {brands.map(({ icon: Icon, name }) => (
                        <div
                            key={name}
                            className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                            <span className="text-base sm:text-lg font-medium">{name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

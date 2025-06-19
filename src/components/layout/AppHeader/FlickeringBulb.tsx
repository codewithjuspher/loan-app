import { motion, useCycle } from "framer-motion";
import { BulbOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { useUIStore } from "../../../stores/uiStore";

export const FlickeringBulb = () => {
    const { darkMode } = useUIStore();
    const [flicker, cycleFlicker] = useCycle(false, true);
    const prevDarkMode = useRef(darkMode);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        const flickerSequence = () => {
            const sequence = [100, 70, 200, 100, 150];
            let i = 0;

            const run = () => {
                if (i >= sequence.length) return;
                cycleFlicker();
                timeoutId = setTimeout(() => {
                    cycleFlicker();
                    i++;
                    run();
                }, sequence[i]);
            };

            run();
        };

        if (darkMode && !prevDarkMode.current) {
            flickerSequence();
        }

        prevDarkMode.current = darkMode;

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [darkMode, cycleFlicker]);

    return (
        <motion.div
            whileHover={{
                opacity: [1, 0.5, 1],
                transition: { duration: 0.3, repeat: 2 },
                filter: darkMode ? "drop-shadow(0 0 8px #FACC15)" : "none",
            }}
            animate={{
                opacity: darkMode ? (flicker ? 0.3 : 1) : 0.4,
                filter: darkMode ? "drop-shadow(0 0 6px #FACC15)" : "none",
                color: darkMode ? "#FACC15" : "#888",
            }}
            transition={{ duration: 0.1 }}
            style={{ fontSize: 20, cursor: "pointer" }}
        >
            <BulbOutlined />
        </motion.div>
    );
};

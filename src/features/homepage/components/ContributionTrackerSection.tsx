import React from "react"
import { ResponsiveLine } from "@nivo/line"
import { motion, Variants } from "framer-motion"
import { theme } from "antd"
import { useTranslation } from "react-i18next"

const monthLabels: Record<string, string[]> = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    fil: ["Ene", "Peb", "Mar", "Abr", "May", "Hun"],
    ja: ["1月", "2月", "3月", "4月", "5月", "6月"]
};

const chartVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
}

export const ContributionTrackerSection: React.FC = () => {
    const { token } = theme.useToken()
    const { i18n, t } = useTranslation("homepage");

    const localizedData = [
        {
            id: t("contribution_tracker.title", "Contributions"),
            data: monthLabels[i18n.language as keyof typeof monthLabels]?.map((label, idx) => ({
                x: label,
                y: [150, 200, 250, 300, 400, 350][idx]
            })) || []
        }
    ];

    const bgColor =
        token.colorBgBase === "#ffffff" ? "#f9fafb" : token.colorBgLayout;

    return (
        <section
            className="py-20 px-4 transition-colors duration-700"
            style={{
                backgroundColor: bgColor,
                color: token.colorText
            }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    variants={chartVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ color: token.colorText }}>
                        {t("contribution_tracker.title", "Track Contributions Over Time")}
                    </h2>
                    <p className="mt-2" style={{ color: token.colorTextSecondary }}>
                        {t("contribution_tracker.description", "Stay on top of group progress and your own inputs.")}
                    </p>
                </motion.div>

                <motion.div
                    className="h-[400px] rounded-xl p-4 shadow-lg transition-colors duration-700"
                    style={{ backgroundColor: token.colorBgElevated }}
                    variants={chartVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <ResponsiveLine
                        data={localizedData}
                        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: t("contribution_tracker.month", "Month"),
                            legendOffset: 36,
                            legendPosition: "middle"
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: t("contribution_tracker.amount", "Amount"),
                            legendOffset: -40,
                            legendPosition: "middle"
                        }}
                        pointSize={10}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        useMesh={true}
                        theme={{
                            axis: {
                                ticks: {
                                    text: { fill: token.colorTextSecondary }
                                },
                                legend: {
                                    text: { fill: token.colorTextSecondary }
                                }
                            },
                            tooltip: {
                                container: {
                                    background: token.colorBgElevated,
                                    color: token.colorText
                                }
                            }
                        }}
                    />
                </motion.div>
            </div>
        </section>
    )
}

import React, { useEffect, useState } from "react"
import { ResponsiveLine } from "@nivo/line"
import { motion, Variants } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useUIStore } from "../../../stores/uiStore"

const getMonthLabels = (lang: string): string[] => {
    const now = new Date()
    const currentMonth = now.getMonth()

    const labels: Record<string, string[]> = {
        en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        fil: ["Ene", "Peb", "Mar", "Abr", "May", "Hun", "Hul", "Ago", "Set", "Okt", "Nob", "Dis"],
        ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    }

    const fallback = labels["en"] ?? Array.from({ length: 12 }, (_, i) => `M${i + 1}`)
    const langLabels = labels[lang as keyof typeof labels] ?? fallback
    return langLabels.slice(0, currentMonth + 1)
}

const chartVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
}

export const ContributionTrackerSection: React.FC = () => {
    const { i18n, t } = useTranslation("homepage")
    const { darkMode } = useUIStore()

    const [chartData, setChartData] = useState<{ x: string; y: number }[]>([])

    useEffect(() => {
        const months = getMonthLabels(i18n.language)
        const values: { x: string; y: number }[] = []

        let previous = 10000 + Math.floor(Math.random() * 10000)

        months.forEach((label) => {
            const fluctuation = (Math.random() - 0.4) * 0.2
            const multiplier = 1 + fluctuation

            let current = Math.max(previous * multiplier, previous * 0.9)
            current = Math.floor(current)

            values.push({ x: label, y: current })
            previous = current
        })

        setChartData(values)
    }, [i18n.language])

    const localizedData = [
        {
            id: t("contribution_tracker.title", "Contributions"),
            data: chartData
        }
    ]

    const bgColor = darkMode ? "#1f1f1f" : "#f9fafb"
    const fgColor = darkMode ? "#ffffff" : "#1f2937"
    const secondaryText = darkMode ? "#d1d5db" : "#6b7280"
    const cardBg = darkMode ? "#2a2a2a" : "#ffffff"

    return (
        <section className="py-20 px-4 transition-colors duration-700" style={{ backgroundColor: bgColor, color: fgColor }}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    variants={chartVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">{t("contribution_tracker.title", "Track Contributions Over Time")}</h2>
                    <p className="mt-2" style={{ color: secondaryText }}>
                        {t("contribution_tracker.description", "Stay on top of group progress and your own inputs.")}
                    </p>
                </motion.div>

                <motion.div
                    className="h-[400px] rounded-xl p-4 shadow-lg transition-colors duration-700"
                    style={{ backgroundColor: cardBg }}
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
                                    text: { fill: secondaryText }
                                },
                                legend: {
                                    text: { fill: secondaryText }
                                }
                            },
                            tooltip: {
                                container: {
                                    background: cardBg,
                                    color: fgColor
                                }
                            }
                        }}
                    />
                </motion.div>
            </div>
        </section>
    )
}

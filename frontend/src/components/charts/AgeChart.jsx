import React from "react";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const COLORS = [
    "#1a75ff", // Main blue
    "#007c8f", // Teal blue
    "#66c9d9", // Light blue
    "#3b486b", // Dark blue
];

const AgeChart = ({ total, ageGroups = {} }) => {
    const { t } = useTranslation("statistics");

    // Transform data for the chart with safe defaults
    const data = [
        {
            name: t("age_breakdown.under_18"),
            value: ageGroups["<18"] || 0,
            color: COLORS[0]
        },
        {
            name: t("age_breakdown.18_30"),
            value: ageGroups["18-30"] || 0,
            color: COLORS[1]
        },
        {
            name: t("age_breakdown.31_50"),
            value: ageGroups["31-50"] || 0,
            color: COLORS[2]
        },
        {
            name: t("age_breakdown.over_50"),
            value: ageGroups[">50"] || 0,
            color: COLORS[3]
        }
    ];



    return (
        <Card className="py-3 px-3 border-gray-50 bg-white shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800">
                        {t("age_breakdown.title")}
                    </h2>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{total}</p>
                        <p className="text-xs text-gray-600">{t("common.total")}</p>
                    </div>
                </div>

                <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 10 }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                tick={{ fontSize: 10 }}
                                width={30}
                            />
                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} (${total > 0 ? ((value / total) * 100).toFixed(1) : 0}%)`,
                                    t("common.count")
                                ]}
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[4, 4, 0, 0]}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        opacity={1}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Age groups summary */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                    <div
                        className="text-center p-2 rounded-lg"
                        style={{ backgroundColor: `${COLORS[0]}20` }}
                    >
                        <div className="text-sm font-bold" style={{ color: COLORS[0] }}>{ageGroups["<18"] || 0}</div>
                        <div className="text-xs text-gray-600">{t("age_breakdown.under_18")}</div>
                    </div>
                    <div
                        className="text-center p-2 rounded-lg"
                        style={{ backgroundColor: `${COLORS[1]}20` }}
                    >
                        <div className="text-sm font-bold" style={{ color: COLORS[1] }}>{ageGroups["18-30"] || 0}</div>
                        <div className="text-xs text-gray-600">{t("age_breakdown.18_30")}</div>
                    </div>
                    <div
                        className="text-center p-2 rounded-lg"
                        style={{ backgroundColor: `${COLORS[2]}20` }}
                    >
                        <div className="text-sm font-bold" style={{ color: COLORS[2] }}>{ageGroups["31-50"] || 0}</div>
                        <div className="text-xs text-gray-600">{t("age_breakdown.31_50")}</div>
                    </div>
                    <div
                        className="text-center p-2 rounded-lg"
                        style={{ backgroundColor: `${COLORS[3]}20` }}
                    >
                        <div className="text-sm font-bold" style={{ color: COLORS[3] }}>{ageGroups[">50"] || 0}</div>
                        <div className="text-xs text-gray-600">{t("age_breakdown.over_50")}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AgeChart; 
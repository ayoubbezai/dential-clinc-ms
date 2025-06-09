import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const COLORS = [
    "#3b82f6", // Blue for male
    "#ec4899", // Pink for female
];

const GenderChart = ({ total, male, female }) => {
    const { t } = useTranslation("statistics");

    // Transform data for the chart
    const data = [
        {
            name: t("gender_breakdown.male"),
            value: male,
            color: COLORS[0]
        },
        {
            name: t("gender_breakdown.female"),
            value: female,
            color: COLORS[1]
        }
    ].filter(item => item.value > 0); // Only show segments with values > 0

    const totalCount = male + female;

    return (
        <Card className="py-3 px-3 border-gray-50 bg-white shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <h2 className="text-lg font-bold mb-3 text-center text-gray-800">
                    {t("gender_breakdown.title")}
                </h2>

                {/* Total count display */}
                <div className="text-center mb-2">
                    <p className="text-xl font-bold text-gray-900">{totalCount}</p>
                    <p className="text-xs text-gray-600">{t("gender_breakdown.total_patients")}</p>
                </div>

                <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={false}
                                outerRadius={60}
                                innerRadius={20}
                                fill="#6366f1"
                                dataKey="value"
                                paddingAngle={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} (${((value / totalCount) * 100).toFixed(1)}%)`,
                                    name
                                ]}
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={24}
                                formatter={(value, entry) => (
                                    <span style={{ color: '#374151', fontSize: '12px' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Gender breakdown summary */}
                <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{male}</div>
                        <div className="text-xs text-blue-700">{t("gender_breakdown.male")}</div>
                    </div>
                    <div className="text-center p-2 bg-pink-50 rounded-lg">
                        <div className="text-lg font-bold text-pink-600">{female}</div>
                        <div className="text-xs text-pink-700">{t("gender_breakdown.female")}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GenderChart;
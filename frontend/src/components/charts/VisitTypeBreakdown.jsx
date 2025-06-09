import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const COLORS = [
    "#1a75ff", // Blue
    "#007c8f", // Teal
    "#66c9d9", // Light blue
    "#3b486b", // Dark blue
    "#ff6b6b", // Red
    "#4ecdc4", // Turquoise
];

const VisitTypeBreakdown = ({ stat }) => {
    const { t } = useTranslation("overview");

    // Transform stat data with translations - show all types even if 0
    const data = stat?.map(({ type, count }) => ({
        name: t(`visit_type_breakdown.${type}`), // Get translated label
        value: count,
        originalType: type, // Keep original type for tooltip
    })) || [];

    const totalVisits = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    {t("visit_type_breakdown.title")}
                </h2>

                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.filter(item => item.value > 0)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                innerRadius={30}
                                fill="#1a75ff"
                                dataKey="value"
                                paddingAngle={2}
                            >
                                {data.filter(item => item.value > 0).map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#ffffff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} (${totalVisits > 0 ? ((value / totalVisits) * 100).toFixed(1) : 0}%)`,
                                    name
                                ]}
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default VisitTypeBreakdown;
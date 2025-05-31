import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const COLORS = [
    "#1a75ff",
    "#007c8f",
    "#66c9d9",
    "#3b486b",
    "#ff6b6b",
    "#4ecdc4",
];

const VisitTypeBreakdown = ({ stat }) => {
    const { t } = useTranslation("overview");

    // Transform stat data with translations
    const data = stat?.map(({ type, count }) => ({
        name: t(`visit_type_breakdown.${type}`), // Get translated label
        value: count,
        originalType: type // Keep original type for tooltip
    })) || [];

    return (
        <Card className="py-4 px-1 border-gray-50 bg-white shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
                    {t("visit_type_breakdown.title")}
                </h2>
                <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#6366f1"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name, props) => [
                                    value,
                                    t(`visit_type_breakdown.${props.payload.originalType}`)
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default VisitTypeBreakdown;
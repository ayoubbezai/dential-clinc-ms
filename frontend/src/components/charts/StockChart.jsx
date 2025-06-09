import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const STOCK_COLORS = {
    expired: "#ef4444", // Red
    out_of_stock: "#f97316", // Orange
    low_stock: "#eab308", // Yellow
    good_stock: "#10b981", // Emerald
};

const STOCK_ICONS = {
    expired: "⏰",
    out_of_stock: "📦",
    low_stock: "⚠️",
    good_stock: "✅",
};

const StockChart = ({ stock = {} }) => {
    const { t } = useTranslation("statistics");

    // Transform data for the chart - show all categories even if 0
    const stockCategories = ["expired", "out_of_stock", "low_stock", "good_stock"];

    const data = stockCategories
        .map(category => ({
            name: t(`stock.${category}`, category),
            value: stock[category] || 0,
            color: STOCK_COLORS[category],
            icon: STOCK_ICONS[category],
            category: category
        }));

    const totalItems = stock.total_items || 0;

    return (
        <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-emerald-50 shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {t("stock.title")}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {t("stock.subtitle")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{totalItems}</p>
                        <p className="text-xs text-gray-600">{t("stock.total_items")}</p>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="h-32 mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.filter(item => item.value > 0)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={false}
                                outerRadius={45}
                                innerRadius={15}
                                fill="#10b981"
                                dataKey="value"
                                paddingAngle={2}
                            >
                                {data.filter(item => item.value > 0).map((entry, index) => (
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
                                    `${value} (${totalItems > 0 ? ((value / totalItems) * 100).toFixed(1) : 0}%)`,
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
                                height={20}
                                formatter={(value, entry) => (
                                    <span style={{ color: '#374151', fontSize: '11px' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Stock Status Cards */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {data.map((item) => {
                        const percentage = totalItems > 0 ? (item.value / totalItems) * 100 : 0;
                        return (
                            <div
                                key={item.category}
                                className="flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer text-center"
                                style={{ backgroundColor: `${item.color}08` }}
                            >
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600 text-lg mb-1"
                                >
                                    {item.icon}
                                </div>
                                <p className="text-xs font-bold" style={{ color: item.color }}>
                                    {item.value}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {percentage.toFixed(1)}%
                                </p>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default StockChart; 
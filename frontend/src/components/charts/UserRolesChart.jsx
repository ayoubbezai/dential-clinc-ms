import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent } from "@/components/designSystem/card";

const ROLE_COLORS = {
    clinic: "#1a75ff", // Main blue
    dentist: "#007c8f", // Teal blue
    patient: "#66c9d9", // Light blue
    receptionist: "#3b486b", // Dark blue
    assistant: "#f59e0b", // Orange
};

const ROLE_ICONS = {
    clinic: "🏥",
    dentist: "👨‍⚕️",
    patient: "👤",
    receptionist: "📞",
    assistant: "👩‍💼",
};

const UserRolesChart = ({ total, byRole = {} }) => {
    const { t } = useTranslation("statistics");

    // Transform data for the chart with all possible roles
    const allRoles = ["clinic", "dentist", "patient", "receptionist", "assistant"];

    const data = allRoles
        .map(role => ({
            name: t(`user_roles.${role}`, role),
            value: byRole[role] || 0,
            color: ROLE_COLORS[role],
            icon: ROLE_ICONS[role],
            role: role
        }));

    const totalUsers = total || 0;

    return (
        <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-purple-50 shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {t("user_roles.title")}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {t("user_roles.subtitle")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{totalUsers}</p>
                        <p className="text-xs text-gray-600">{t("common.total")}</p>
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
                                fill="#6366f1"
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
                                    `${value} (${totalUsers > 0 ? ((value / totalUsers) * 100).toFixed(1) : 0}%)`,
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

                {/* Role Breakdown Cards */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                    {data.map((item) => {
                        const percentage = totalUsers > 0 ? (item.value / totalUsers) * 100 : 0;
                        return (
                            <div
                                key={item.role}
                                className="flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer text-center"
                                style={{ backgroundColor: `${item.color}10` }}
                            >
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-full text-white text-lg mb-1"
                                    style={{ backgroundColor: `${item.color}80` }}
                                >
                                    {item.icon}
                                </div>
                                <p className="font-semibold text-gray-800 text-xs truncate w-full">
                                    {item.name}
                                </p>
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

export default UserRolesChart; 
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/designSystem/card";

const STATUS_COLORS = {
    completed: "#10b981", // Green for completed
    working_on_it: "#f59e0b", // Orange for working
    pending: "#ef4444", // Red for pending
};

const STATUS_ICONS = {
    completed: "✓",
    working_on_it: "⟳",
    pending: "⏳",
};

const FolderStatusChart = ({ total, status }) => {
    const { t } = useTranslation("statistics");

    const statusData = [
        {
            key: "completed",
            label: t("folder_status.completed"),
            count: status?.completed || 0,
            color: STATUS_COLORS.completed,
            icon: STATUS_ICONS.completed
        },
        {
            key: "working_on_it",
            label: t("folder_status.working_on_it"),
            count: status?.working_on_it || 0,
            color: STATUS_COLORS.working_on_it,
            icon: STATUS_ICONS.working_on_it
        },
        {
            key: "pending",
            label: t("folder_status.pending"),
            count: status?.pending || 0,
            color: STATUS_COLORS.pending,
            icon: STATUS_ICONS.pending
        }
    ];

    const totalFolders = total || 0;

    return (
        <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {t("folder_status.title")}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {t("folder_status.subtitle")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{totalFolders}</p>
                        <p className="text-xs text-gray-600">{t("common.total")}</p>
                    </div>
                </div>

                {/* Circular Progress Indicators */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {statusData.map((item) => {
                        const percentage = totalFolders > 0 ? (item.count / totalFolders) * 100 : 0;
                        const circumference = 2 * Math.PI * 30; // Larger radius = 30
                        const strokeDasharray = circumference;
                        const strokeDashoffset = circumference - (percentage / 100) * circumference;

                        return (
                            <div key={item.key} className="text-center">
                                <div className="relative inline-block">
                                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 70 70">
                                        {/* Background circle */}
                                        <circle
                                            cx="35"
                                            cy="35"
                                            r="30"
                                            stroke="#e5e7eb"
                                            strokeWidth="5"
                                            fill="transparent"
                                        />
                                        {/* Progress circle */}
                                        <circle
                                            cx="35"
                                            cy="35"
                                            r="30"
                                            stroke={item.color}
                                            strokeWidth="5"
                                            fill="transparent"
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-lg font-bold" style={{ color: item.color }}>
                                            {item.icon}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="text-lg font-bold text-gray-900">{item.count}</div>
                                    <div className="text-sm text-gray-600">{item.label}</div>
                                    <div className="text-sm font-medium" style={{ color: item.color }}>
                                        {percentage.toFixed(0)}%
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Simple Summary Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {statusData.map((item) => (
                        <div
                            key={item.key}
                            className="p-3 rounded-xl text-center transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: `${item.color}10` }}
                        >
                            <div className="text-lg font-bold mb-1" style={{ color: item.color }}>
                                {item.count}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                                {item.label.split(' ')[0]}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default FolderStatusChart; 
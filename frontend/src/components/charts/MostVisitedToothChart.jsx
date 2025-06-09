import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/designSystem/card";

const TOOTH_COLORS = {
    primary: "#1a75ff", // Main blue
    secondary: "#007c8f", // Teal blue
    accent: "#66c9d9", // Light blue
};

const MostVisitedToothChart = ({ mostVisitedTooth }) => {
    const { t } = useTranslation("statistics");

    const teethData = mostVisitedTooth || [];
    const topTooth = teethData.length > 0 ? teethData[0] : null;

    // Generate tooth number display
    const getToothDisplay = (toothNumber) => {
        if (!toothNumber) return "N/A";
        return `Tooth ${toothNumber}`;
    };

    // Get tooth position description
    const getToothPosition = (toothNumber) => {
        if (!toothNumber) return "";

        // Upper teeth (1-16)
        if (toothNumber >= 1 && toothNumber <= 16) {
            return "Upper";
        }
        // Lower teeth (17-32)
        else if (toothNumber >= 17 && toothNumber <= 32) {
            return "Lower";
        }
        return "";
    };

    // Get tooth side
    const getToothSide = (toothNumber) => {
        if (!toothNumber) return "";

        // Right side (1-8, 17-24)
        if ((toothNumber >= 1 && toothNumber <= 8) || (toothNumber >= 17 && toothNumber <= 24)) {
            return "Right";
        }
        // Left side (9-16, 25-32)
        else if ((toothNumber >= 9 && toothNumber <= 16) || (toothNumber >= 25 && toothNumber <= 32)) {
            return "Left";
        }
        return "";
    };

    return (
        <Card className="py-3 px-4 border-gray-50 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {t("most_visited_tooth.title")}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {t("most_visited_tooth.subtitle")}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                            {topTooth ? topTooth.visits : 0}
                        </p>
                        <p className="text-xs text-gray-600">{t("common.visits")}</p>
                    </div>
                </div>

                {/* Top Tooth Visualization */}
                {topTooth && (
                    <div className="text-center mb-4">
                        <div className="relative inline-block">
                            <div
                                className="w-20 h-20 rounded-full border-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                style={{
                                    backgroundColor: TOOTH_COLORS.primary,
                                    borderColor: TOOTH_COLORS.secondary
                                }}
                            >
                                {topTooth.tooth_number}
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {topTooth.visits}
                            </div>
                        </div>
                    </div>
                )}

                {/* Top Tooth Information */}
                {topTooth && (
                    <div className="space-y-3">
                        <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">
                                    {getToothDisplay(topTooth.tooth_number)}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {getToothPosition(topTooth.tooth_number)} {getToothSide(topTooth.tooth_number)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {topTooth.message}
                                </div>
                            </div>
                        </div>

                        {/* Top 3 Teeth List */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-700 text-center">
                                {t("most_visited_tooth.top_3")}
                            </h3>
                            {teethData.slice(0, 3).map((tooth, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2 rounded-lg transition-all duration-300 hover:shadow-sm cursor-pointer"
                                    style={{ backgroundColor: `${TOOTH_COLORS.primary}08` }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                            style={{ backgroundColor: TOOTH_COLORS.primary }}
                                        >
                                            {index + 1}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {getToothDisplay(tooth.tooth_number)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold" style={{ color: TOOTH_COLORS.primary }}>
                                            {tooth.visits}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            {t("common.visits")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!topTooth && (
                    <div className="text-center py-8">
                        <div className="text-gray-400 text-lg mb-2">🦷</div>
                        <p className="text-sm text-gray-500">
                            {t("most_visited_tooth.no_data")}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MostVisitedToothChart; 
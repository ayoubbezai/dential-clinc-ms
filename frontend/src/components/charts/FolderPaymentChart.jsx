import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/designSystem/card";

const PAYMENT_COLORS = {
    fully: "#10b981", // Green for fully paid
    partially: "#f59e0b", // Orange for partially paid
    unpaid: "#ef4444", // Red for unpaid
};

const FolderPaymentChart = ({ total, paid }) => {
    const { t } = useTranslation("statistics");

    const paymentData = [
        {
            key: "fully",
            label: t("folder_payment.fully_paid"),
            count: paid?.fully || 0,
            color: PAYMENT_COLORS.fully
        },
        {
            key: "partially",
            label: t("folder_payment.partially_paid"),
            count: paid?.partially || 0,
            color: PAYMENT_COLORS.partially
        },
        {
            key: "unpaid",
            label: t("folder_payment.unpaid"),
            count: paid?.unpaid || 0,
            color: PAYMENT_COLORS.unpaid
        }
    ];

    const totalFolders = total || 0;

    return (
        <Card className="py-3 px-3 border-gray-50 bg-white shadow-xl rounded-2xl h-full mx-auto">
            <CardContent>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800">
                        {t("folder_payment.title")}
                    </h2>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{totalFolders}</p>
                        <p className="text-xs text-gray-600">{t("common.total")}</p>
                    </div>
                </div>

                {/* Payment Progress Bar */}
                <div className="mb-4">
                    <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
                        {paymentData.map((item) => {
                            const percentage = totalFolders > 0 ? (item.count / totalFolders) * 100 : 0;
                            return (
                                <div
                                    key={item.key}
                                    className="h-full transition-all duration-500"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: item.color
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Payment Status List */}
                <div className="space-y-2">
                    {paymentData.map((item) => {
                        const percentage = totalFolders > 0 ? (item.count / totalFolders) * 100 : 0;
                        return (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-2 rounded-lg"
                                style={{ backgroundColor: `${item.color}15` }}
                            >
                                <span className="text-sm text-gray-700">{item.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                                    <span className="text-xs text-gray-500">({percentage.toFixed(0)}%)</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Payment Summary Cards */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {paymentData.map((item) => (
                            <div
                                key={item.key}
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${item.color}20` }}
                            >
                                <div className="text-sm font-bold" style={{ color: item.color }}>{item.count}</div>
                                <div className="text-xs text-gray-600">{item.label.split(' ')[0]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default FolderPaymentChart; 
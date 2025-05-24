import React from "react";
import { Link } from "react-router-dom";

const RecentTransactions = ({ transactions, isLoading, t }) => {
    // Skeleton loader for loading state
    const SkeletonLoader = () => (
        <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                    <div className="w-full">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <div className="w-full text-right">
                        <div className="h-3 bg-gray-200 rounded w-1/3 ml-auto mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2 ml-auto"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-white px-4 py-3 rounded-2xl shadow-md w-full min-h-[293px] text-[#0f172a]">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 pt-1 border-b mb-4 border-gray-300">
                <h2 className="text-[15px] gray-100 leading-none font-semibold text-[#0f172afa]">
                    {t("recent_transactions.recent_transactions_title")}
                </h2>
            </div>

            {/* Content */}
            {isLoading ? (
                <SkeletonLoader />
            ) : transactions?.length > 0 ? (
                <div className="mt-2 space-y-4">
                    {transactions.map((tx, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <Link to={`/patient/${tx.patient_id}`} className="font-medium text-sm mb-[1px]">
                                    {tx.patient_name}
                                </Link>
                                <p className="text-gray-500 text-[13px]">{tx.phone}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-sm mb-[1px]">{tx.amount} DA</p>
                                <p className="text-gray-400 text-[13px]">{tx.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-[200px]">
                    <p className="text-gray-500">{t("recent_transactions.no_transactions_found")}</p>
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;

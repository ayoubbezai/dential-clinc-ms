import React from "react";

const PaymentCard = ({ title, amount, comparison, percentage, isProfit }) => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 ">
            {/* Header */}
            <p className="text-gray-500 text-sm font-medium">{title}</p>

            {/* Amount */}
            <div className="mt-1 flex items-center">
                <span className="text-xl font-semibold">$</span>
                <span className="text-3xl font-bold ml-1">{amount}</span>
            </div>

            {/* Comparison */}
            <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm">{comparison}</p>

                {/* Percentage Badge */}
                <span className={` ${isProfit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  text-xs font-bold px-2 py-1 rounded-lg`}>
                    {percentage}
                </span>
            </div>
        </div >
    );
};

export default PaymentCard;



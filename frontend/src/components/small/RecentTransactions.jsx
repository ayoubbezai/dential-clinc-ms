import React from "react";

const transactions = [
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },

];

const RecentTransactions = () => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md w-full text-[#0f172a]">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 pt-1 border-b mb-4 border-gray-300">
                <h2 className="text-[14.2px] gray-100 leading-none font-semibold text-[#0f172afa] ">Recent Transaction</h2>
                <a href="#" className="text-blue-500 text-xs font-semibold hover:underline">
                    Show all
                </a>
            </div>

            {/* Transactions List */}
            <div className="mt-2 space-y-4">
                {transactions.map((tx, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-sm mb-[1px]">{tx.name}</p>
                            <p className="text-gray-500 text-[13px]">{tx.account}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-sm mb-[1px]">{tx.amount}</p>
                            <p className="text-gray-400 text-[13px]">{tx.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;

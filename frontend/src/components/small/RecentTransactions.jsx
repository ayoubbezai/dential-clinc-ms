import React from "react";
import { Link } from "react-router-dom";

const transactions = [
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },
    { name: "Ayoub bezai", account: "123******78", amount: "$240.00", date: "Jul 12, 2024" },

];

const RecentTransactions = ({ transactions }) => {

    console.log(transactions)


    return (

        <div className="bg-white px-4  py-3 rounded-2xl shadow-md w-full text-[#0f172a]">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 pt-1 border-b mb-4 border-gray-300">
                <h2 className="text-[15px] gray-100 leading-none font-semibold text-[#0f172afa] ">Recent Transaction</h2>

            </div>

            {/* Transactions List */}
            <div className="mt-2 space-y-4">
                {transactions?.map((tx, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div>
                            <Link to={`/patient/${tx.patient_id}`} className="font-medium text-sm mb-[1px]">{tx.patient_name}</Link>
                            <p className="text-gray-500 text-[13px]">{tx.phone}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-sm mb-[1px]">{tx.amount} DA</p>
                            <p className="text-gray-400 text-[13px]">{tx.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;

import React, { useState, useRef } from "react";
import { FaEllipsisH, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { changenumberToText } from "@/utils/other/dateToText";
import useClickOutside from "@/hooks/other/useClickOutside";
const PaymentCard = ({ title, amount, comparison, percentage, isProfit, setDate, hasMenu = true, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useClickOutside(menuRef, () => setIsOpen(false));




    const handleSelect = (days) => {
        if (setDate) {
            setDate(days);
        }
        setIsOpen(false);
    };

    return (
        <div className={`bg-white shadow-md rounded-2xl p-4 relative ${title === "Pending Payments" ? "py-[18px]" : ""}`}>
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm font-medium">{title}</p>

                {/* Dropdown Menu Trigger (Only if hasMenu is true) */}
                {hasMenu && (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-500 focus:outline-none hover:bg-gray-200 p-1 rounded-full transition"
                        >
                            <FaEllipsisH />
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md overflow-hidden z-10 border border-gray-100">
                                {["7d", "30d", "90d", "365d"].map((option) => (
                                    <button
                                        key={option}
                                        className={`block w-full text-left px-4 py-2 text-xs whitespace-nowrap transition-all ${selectedValue === option ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                                            }`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {changenumberToText(option)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Amount */}
            <div className="mt-1 flex items-center">
                <span className="text-3xl font-bold ml-1">{amount} <span className="text-[22px]">DA</span></span>
            </div>

            {/* Comparison */}
            <div className="flex justify-between items-center mt-2">
                {hasMenu ? (
                    <p className="text-gray-500 text-sm">Vs {comparison || "Last Month"}</p>
                ) : (
                    <p className="text-gray-500 text-sm mt-1">All the Time</p>
                )}

                {/* Percentage Badge with imported arrows */}
                {hasMenu && (
                    <span className={`flex items-center gap-1 ${isProfit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} text-xs font-bold px-2 py-1 rounded-lg`}>
                        {isProfit ? <FaArrowUp size={11} /> : <FaArrowDown size={11} />} {Math.abs(percentage)}%
                    </span>
                )}
            </div>
        </div>
    );
};

export default PaymentCard;

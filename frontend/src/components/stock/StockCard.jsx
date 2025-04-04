import React from 'react'

const StockCard = ({ title, count, Icon }) => {
    return (
        <div className="flex items-center col-span-3 justify-around p-4 rounded-lg py-6 shadow-md bg-white border border-gray-300">
            <div>
                {Icon && <img src={Icon} className="w-16 h-16 text-supporting-2" />}
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-2xl text-gray-800">{count}</p>
            </div>
        </div>
    );
};
export default StockCard
import React, { useEffect, useState } from 'react';
import useStock from '@/hooks/other/useStock';
import out_of_stock from '@/assets/icons/out_of_stock.svg';
import low_stock from '@/assets/icons/low_stock.svg';
import expired from '@/assets/icons/expired.svg';
import quantity from '@/assets/icons/quantity.svg';

// Card component to display stock information
const Card = ({ title, count, Icon }) => {
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

const StockCards = () => {
    const { statistics } = useStock();



    return (
        <>
            <Card
                title="Out of Stock"
                count={statistics?.out_of_stock}
                Icon={out_of_stock}
            />
            <Card
                title="Low Stock"
                count={statistics?.low_stock}
                Icon={low_stock}
            />
            <Card
                title="Expired"
                count={statistics?.expired}
                Icon={expired}
            />
            <Card
                title="Total Items"
                count={statistics?.total_items}
                Icon={quantity}
            />
        </>
    );
};

export default StockCards;

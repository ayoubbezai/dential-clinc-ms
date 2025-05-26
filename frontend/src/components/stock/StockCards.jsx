import React from "react";

import out_of_stock from '@/assets/icons/out_of_stock.svg';
import low_stock from '@/assets/icons/low_stock.svg';
import expired from '@/assets/icons/expired.svg';
import quantity from '@/assets/icons/quantity.svg';
import StockCard from './StockCard';

const StockCards = ({ statistics,t }) => {

    return (
        <>
            <StockCard
                title={t("stock_cards.total_items")}
                count={statistics?.total_items}
                Icon={quantity}
            />
            <StockCard
                title={t("stock_cards.out_of_stock")}
                count={statistics?.out_of_stock}
                Icon={out_of_stock}
            />
            <StockCard
                title={t("stock_cards.low_stock")}
                count={statistics?.low_stock}
                Icon={low_stock}
            />
            <StockCard
                title={t("stock_cards.expired")}
                count={statistics?.expired}
                Icon={expired}
            />
        </>
    );
};

export default StockCards;

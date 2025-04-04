import out_of_stock from '@/assets/icons/out_of_stock.svg';
import low_stock from '@/assets/icons/low_stock.svg';
import expired from '@/assets/icons/expired.svg';
import quantity from '@/assets/icons/quantity.svg';
import StockCard from './StockCard'; 


const StockCards = ({ statistics }) => {



    return (
        <>
            <StockCard
                title="Total Items"
                count={statistics?.total_items}
                Icon={quantity}
            />
            <StockCard
                title="Out of Stock"
                count={statistics?.out_of_stock}
                Icon={out_of_stock}
            />
            <StockCard
                title="Low Stock"
                count={statistics?.low_stock}
                Icon={low_stock}
            />
            <StockCard
                title="Expired"
                count={statistics?.expired}
                Icon={expired}
            />

        </>
    );
};

export default StockCards;

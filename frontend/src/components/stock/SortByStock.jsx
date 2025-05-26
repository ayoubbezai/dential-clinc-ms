import React from 'react';
import { selectClassName } from '@/constant/classNames';

const SortByStock = ({ sortBy, setSortBy,t }) => {

    return (
        <select
            className={selectClassName}
            name="sort_by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="created_at">{t("sort.created_at")}</option>
            <option value="supplier_name">{t("sort.supplier_name")}</option>
            <option value="medicine_name">{t("sort.medicine_name")}</option>
            <option value="expiry_date">{t("sort.expiry_date")}</option>
        </select>
    );
};

export default SortByStock;

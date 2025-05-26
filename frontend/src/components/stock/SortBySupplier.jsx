import React from 'react';
import { selectClassName } from '@/constant/classNames';

const SortBySupplier = ({ sortBy, setSortBy, t }) => {
    return (
        <select
            className={selectClassName}
            name="sort_by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="name">{t('suppliers.supplier_name')}</option>
            <option value="created_at">{t('suppliers.date')}</option>
        </select>
    );
};

export default SortBySupplier;

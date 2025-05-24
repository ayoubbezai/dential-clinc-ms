import React from 'react';
import { selectClassName } from '@/constant/classNames';

const SortByPaymentTable = ({ sortBy, setSortBy, t }) => {
    return (
        <select
            className={selectClassName}
            name="sort_by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="patient_name">{t("sort.patient_name")}</option>
            <option value="amount">{t("sort.amount")}</option>
            <option value="created_at">{t("sort.date")}</option>
        </select>
    );
};

export default SortByPaymentTable;

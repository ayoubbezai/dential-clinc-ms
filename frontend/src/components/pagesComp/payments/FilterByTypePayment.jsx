import React from 'react';
import { selectClassName } from '@/constant/classNames';

const FilterByTypePayment = ({ type, setType, t }) => {
    return (
        <select
            className={selectClassName}
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
        >
            <option value="">{t("all_types")}</option>
            <option value="income">{t("income")}</option>
            <option value="expense">{t("expense")}</option>
            <option value="refund">{t("refund")}</option>
        </select>
    );
};

export default FilterByTypePayment;

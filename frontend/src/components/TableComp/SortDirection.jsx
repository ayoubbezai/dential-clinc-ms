import React from 'react';
import { selectClassName } from '@/constant/classNames';
import { useTranslation } from 'react-i18next';
const SortDirection = ({ sortDirection, setSortDirection }) => {
    const { t } = useTranslation("common");
    return (
        <select
            className={selectClassName}
            name="sort_direction"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
        >
            <option value="asc">{t("sort.ascending")}</option>
            <option value="desc">{t("sort.descending")}</option>
        </select>
    );
};

export default SortDirection;

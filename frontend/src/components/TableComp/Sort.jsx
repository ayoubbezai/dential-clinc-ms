import React from 'react';
import { selectClassName } from '@/constant/classNames';
import { useTranslation } from 'react-i18next';

const Sort = ({ sortBy, sortDirection, setSortBy, setSortDirection }) => {
    const { t } = useTranslation('common');

    return (
        <>
            <select
                className={selectClassName}
                name="sort_direction"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
            >
                <option value="asc">{t('sort.ascending')}</option>
                <option value="desc">{t('sort.descending')}</option>
            </select>

            <select
                className={selectClassName}
                name="sort_by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="created_at">{t('sort.created_at')}</option>
                <option value="patient_name">{t('sort.name')}</option>
                <option value="age">{t('sort.age')}</option>
            </select>
        </>
    );
};

export default Sort;

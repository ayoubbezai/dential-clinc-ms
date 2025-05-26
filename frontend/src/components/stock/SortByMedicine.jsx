import React from 'react'
import { selectClassName } from '@/constant/classNames'

const SortByMedicine = ({ sortBy, setSortBy, t }) => {
    return (
        <select
            className={selectClassName}
            name="sort_by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="name">{t("medicines.medicine_name")}</option>
            <option value="created_at">{t("medicines.date")}</option>
        </select>
    )
}

export default SortByMedicine
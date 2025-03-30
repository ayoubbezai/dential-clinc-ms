import React from 'react'
import { selectClassName } from '@/constant/classNames'
const Sort = ({ sortBy, sortDirection, setSortBy, setSortDirection }) => {

    return (
        <>
            <select
                className={selectClassName}

                name="sort_direction"
                value={sortDirection}
                onChange={(e) => setSortDirection(e.target.value)}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <select
                className={selectClassName}

                name="sort_by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="created_at">Created At</option>
                <option value="patient_name">Name</option>
                <option value="age">Age</option>
            </select>

        </>
    )
}

export default Sort

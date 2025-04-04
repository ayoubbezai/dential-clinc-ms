import React from 'react'
import { selectClassName } from '@/constant/classNames'


const SortBySupplier = ({sortBy , setSortBy}) => {
  return (
      <select
          className={selectClassName}

          name="sort_by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
      >
          <option value="name">Supplier Name</option>
          <option value="created_at">Date</option>
      </select>
  )
}

export default SortBySupplier



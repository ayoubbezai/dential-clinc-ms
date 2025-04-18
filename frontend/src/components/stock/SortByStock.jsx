import React from 'react'
import { selectClassName } from '@/constant/classNames'


const SortByStock = ({sortBy , setSortBy}) => {
  return (
      <select
          className={selectClassName}

          name="sort_by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
      >
          <option value="created_at">Date</option>
          <option value="supplier_name">Supplier Name</option>
          <option value="medicine_name">Medicine Name</option>
          <option value="expiry_date">Expiry Date</option>
      </select>
  )
}

export default SortByStock



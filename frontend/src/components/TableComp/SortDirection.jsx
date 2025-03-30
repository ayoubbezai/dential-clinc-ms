import React from 'react'
import { selectClassName } from '@/constant/classNames'

const SortDirection = ({ sortDirection, setSortDirection }) => {
  return (
      <select
          className={selectClassName}

          name="sort_direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
      >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
      </select>
  )
}

export default SortDirection
